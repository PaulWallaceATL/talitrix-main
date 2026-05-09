"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm({ redirectTo }: { redirectTo: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Login failed.");
      }
      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
      setPending(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-2">
        <span className="text-xs uppercase tracking-widest text-white/60">
          Password
        </span>
        <input
          type="password"
          autoFocus
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-5 py-4 bg-white/[0.04] border border-border-gray rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:bg-white/[0.06] transition-colors"
        />
      </label>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 w-full px-8 py-4 rounded-full bg-white/15 hover:bg-primary/40 backdrop-blur-md transition-colors border border-white/15 disabled:opacity-50"
        style={{
          boxShadow:
            "0px 19px 65.2px rgba(248, 122, 19, 0.25), inset -3px -1px 10.9px rgba(255, 255, 255, 0.29), inset 0px 0px 2px #ffffff",
        }}
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
