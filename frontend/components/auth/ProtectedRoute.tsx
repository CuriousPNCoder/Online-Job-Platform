"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { useToast } from "@/components/ui/Toast";
import { getRoleRedirect } from "@/lib/rbac";
import { Role } from "@/lib/types";

type Props = {
  children: React.ReactNode;
  allowedRoles: Role[];
};

export const ProtectedRoute = ({ children, allowedRoles }: Props): JSX.Element | null => {
  const { isLoading, isAuthenticated, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { pushToast } = useToast();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!isAuthenticated) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
      return;
    }

    if (user && !allowedRoles.includes(user.role)) {
      pushToast({ type: "error", message: "You are not allowed to access that page" });
      router.replace(getRoleRedirect(user.role));
    }
  }, [isLoading, isAuthenticated, user, allowedRoles, pathname, router, pushToast]);

  if (isLoading || !isAuthenticated || !user || !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
};
