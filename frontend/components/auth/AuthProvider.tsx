"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { authApi } from "@/lib/api/auth";
import { storageKeys } from "@/lib/constants";
import { Role, User } from "@/lib/types";

type AuthState = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => Promise<void>;
  refreshMe: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem(storageKeys.token);
    const savedUser = localStorage.getItem(storageKeys.user);

    if (savedToken) {
      setToken(savedToken);
    }
    if (savedUser) {
      setUser(JSON.parse(savedUser) as User);
    }
    setIsLoading(false);
  }, []);

  const login = (nextToken: string, nextUser: User): void => {
    localStorage.setItem(storageKeys.token, nextToken);
    localStorage.setItem(storageKeys.user, JSON.stringify(nextUser));
    setToken(nextToken);
    setUser(nextUser);
  };

  const logout = async (): Promise<void> => {
    try {
      await authApi.logout();
    } catch {
      // no-op
    } finally {
      localStorage.removeItem(storageKeys.token);
      localStorage.removeItem(storageKeys.user);
      setToken(null);
      setUser(null);
    }
  };

  const refreshMe = async (): Promise<void> => {
    if (!localStorage.getItem(storageKeys.token)) {
      return;
    }

    const response = await authApi.me();
    localStorage.setItem(storageKeys.user, JSON.stringify(response.data));
    setUser(response.data);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isLoading,
      isAuthenticated: Boolean(user && token),
      login,
      logout,
      refreshMe
    }),
    [user, token, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthState => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};

export const useRole = (): Role | undefined => {
  return useAuth().user?.role;
};
