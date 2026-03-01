"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AppShell } from "@/components/layout/AppShell";

export default function ProtectedLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <ProtectedRoute allowedRoles={["jobseeker", "recruiter", "admin"]}>
      <AppShell>{children}</AppShell>
    </ProtectedRoute>
  );
}
