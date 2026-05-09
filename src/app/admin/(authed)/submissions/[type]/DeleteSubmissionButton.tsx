"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteSubmissionButton({
  type,
  id,
}: {
  type: string;
  id: string;
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const onClick = async () => {
    if (
      !confirm(
        "Delete this submission? This cannot be undone. Make sure it has been processed first.",
      )
    ) {
      return;
    }
    setPending(true);
    try {
      const res = await fetch(`/api/admin/submissions/${type}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Could not delete.");
      }
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete.");
      setPending(false);
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={pending}
      className="text-xs text-red-400 hover:text-red-300 disabled:opacity-50"
    >
      {pending ? "Deleting…" : "Delete"}
    </button>
  );
}
