import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAuthenticatedAdmin } from "@/lib/admin-auth";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin Login · Talitrix",
  robots: { index: false, follow: false },
};

type SearchParams = Promise<{ from?: string }>;

export default async function LoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { from } = await searchParams;
  if (await isAuthenticatedAdmin()) {
    redirect(from && from.startsWith("/admin") ? from : "/admin");
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground p-4 sm:p-6">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] bg-primary/15 blur-[200px] pointer-events-none" />
      <div className="relative w-full max-w-md border border-border-gray rounded-2xl bg-white/[0.03] backdrop-blur-md p-6 sm:p-10 flex flex-col gap-6 sm:gap-8">
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">
            Talitrix
          </span>
          <h1 className="text-2xl sm:text-3xl">Admin</h1>
          <p className="text-sm text-white/60">
            Enter the admin password to manage news and form submissions.
          </p>
        </div>
        <LoginForm redirectTo={from && from.startsWith("/admin") ? from : "/admin"} />
      </div>
    </div>
  );
}
