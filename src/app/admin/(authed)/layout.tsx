import type { Metadata } from "next";
import AdminSidebar from "./AdminSidebar";

export const metadata: Metadata = {
  title: "Admin · Talitrix",
  robots: { index: false, follow: false },
};

export default function AuthedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground lg:flex">
      <AdminSidebar />
      <main className="flex-1 min-w-0 overflow-x-hidden pt-14 lg:pt-0">
        {children}
      </main>
    </div>
  );
}
