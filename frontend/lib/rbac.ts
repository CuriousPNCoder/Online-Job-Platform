import { roleHome } from "@/lib/constants";
import { Role } from "@/lib/types";

export const canAccessRole = (allowedRoles: Role[], currentRole?: Role): boolean => {
  if (!currentRole) {
    return false;
  }
  return allowedRoles.includes(currentRole);
};

export const getRoleRedirect = (role?: Role): string => {
  if (!role) {
    return "/login";
  }
  return roleHome[role];
};
