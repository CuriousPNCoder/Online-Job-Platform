import { useAuth } from "@/components/auth/AuthProvider";

export const useRequireAuth = () => {
  return useAuth();
};
