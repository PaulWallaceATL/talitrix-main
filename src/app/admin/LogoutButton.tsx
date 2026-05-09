"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const onClick = async () => {
    setPending(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <button
      onClick={onClick}
      disabled={pending}
      className="px-4 py-2 rounded-lg text-sm border border-border-gray hover:border-primary hover:text-primary transition-colors text-left disabled:opacity-50"
    >
      {pending ? "Signing out…" : "Sign out"}
    </button>
  );
}
