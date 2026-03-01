"use client";

import { ReactNode } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Sidebar } from "@/components/layout/Sidebar";

export const AppShell = ({ children }: { children: ReactNode }): JSX.Element => {
  const { user } = useAuth();

  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="mx-auto flex max-w-7xl gap-4 px-4 py-6">
      <Sidebar role={user.role} />
      <main className="flex-1">{children}</main>
    </div>
  );
};
