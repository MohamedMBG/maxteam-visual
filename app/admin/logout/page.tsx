"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLogout() {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    router.replace("/admin/login");
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <p>Logging out...</p>
    </div>
  );
}

