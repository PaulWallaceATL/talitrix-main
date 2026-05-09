import { NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

const TABLE_BY_TYPE: Record<string, string> = {
  contact: "contact_submissions",
  "get-started": "get_started_submissions",
  "participant-registration": "participant_registrations",
};

type Ctx = { params: Promise<{ type: string; id: string }> };

export async function DELETE(_req: Request, ctx: Ctx) {
  if (!(await isAuthenticatedAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { type, id } = await ctx.params;
  const table = TABLE_BY_TYPE[type];
  if (!table) {
    return NextResponse.json(
      { error: "Unknown submission type." },
      { status: 400 },
    );
  }

  const { error } = await supabaseAdmin().from(table).delete().eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
