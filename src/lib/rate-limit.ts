// Best-effort, in-memory fixed-window rate limiter.
//
// NOTE: state lives in a single process. On serverless/multi-instance
// deployments (e.g. Vercel) each instance keeps its own counter, so this
// is a defense-in-depth measure against brute force / spam — not a hard
// global guarantee. For strict global limits, back this with a shared
// store (e.g. Upstash Redis).

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
let lastSweep = 0;

// Periodically drop expired buckets so the Map can't grow unbounded.
function sweep(now: number) {
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

/**
 * Extract a best-effort client IP from standard proxy headers.
 * Falls back to "unknown" so callers still get a (shared) bucket.
 */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

export type RateLimitResult = {
  ok: boolean;
  /** Seconds until the window resets (only meaningful when !ok). */
  retryAfter: number;
};

/**
 * Fixed-window check. Returns `{ ok: false, retryAfter }` once `limit`
 * requests have been seen for `key` within `windowMs`.
 */
export function checkRateLimit(
  req: Request,
  opts: { key: string; limit: number; windowMs: number },
): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const id = `${opts.key}:${getClientIp(req)}`;
  const existing = buckets.get(id);

  if (!existing || existing.resetAt <= now) {
    buckets.set(id, { count: 1, resetAt: now + opts.windowMs });
    return { ok: true, retryAfter: 0 };
  }

  if (existing.count >= opts.limit) {
    return {
      ok: false,
      retryAfter: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  return { ok: true, retryAfter: 0 };
}

/** Standard 429 JSON response with a Retry-After header. */
export function rateLimitResponse(retryAfter: number): Response {
  return new Response(
    JSON.stringify({ error: "Too many requests. Please try again later." }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": String(retryAfter),
      },
    },
  );
}
