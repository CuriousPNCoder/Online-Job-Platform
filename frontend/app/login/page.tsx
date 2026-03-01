"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/lib/api/auth";
import { loginSchema } from "@/lib/validation/schemas";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { useAuth } from "@/components/auth/AuthProvider";
import { useToast } from "@/components/ui/Toast";
import { getRoleRedirect } from "@/lib/rbac";
import { z } from "zod";

type FormValues = z.infer<typeof loginSchema>;

export default function LoginPage(): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const { pushToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema)
  });

  const mutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (response) => {
      login(response.token, response.user);
      pushToast({ type: "success", message: "Login successful" });
      const next = searchParams.get("next");
      router.replace(next ?? getRoleRedirect(response.user.role));
    },
    onError: (error: { userMessage?: string }) => {
      pushToast({ type: "error", message: error.userMessage ?? "Login failed" });
    }
  });

  return (
    <div className="page-wrap flex justify-center">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-brand-900">Login</h1>
        <p className="mt-1 text-sm text-slate-600">Use your registered email and password to access your dashboard.</p>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit((values) => mutation.mutate(values))}>
          <Input
            label="Email"
            placeholder="you@example.com"
            {...register("email")}
            error={errors.email?.message}
            hint="Enter the same email used during registration."
          />
          <PasswordInput
            label="Password"
            {...register("password")}
            error={errors.password?.message}
            hint="Minimum 6 characters. Click the eye icon to show/hide password."
          />
          <div className="rounded-lg border border-brand-100 bg-brand-50 p-3 text-xs text-slate-700">
            Login help: if access fails, check email spelling, password length, and ensure your account is not disabled.
          </div>
          <Button isLoading={mutation.isPending} type="submit" className="w-full">
            Login
          </Button>
        </form>
        <p className="mt-4 text-sm text-slate-600">
          New user? <Link className="text-brand-700" href="/register">Register</Link>
        </p>
      </Card>
    </div>
  );
}
