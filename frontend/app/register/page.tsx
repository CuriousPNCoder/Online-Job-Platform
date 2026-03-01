"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/lib/api/auth";
import { registerSchema } from "@/lib/validation/schemas";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Select } from "@/components/ui/Select";
import { useAuth } from "@/components/auth/AuthProvider";
import { useToast } from "@/components/ui/Toast";
import { getRoleRedirect } from "@/lib/rbac";
import { z } from "zod";

type FormValues = z.infer<typeof registerSchema>;

export default function RegisterPage(): JSX.Element {
  const router = useRouter();
  const { login } = useAuth();
  const { pushToast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: "jobseeker" }
  });
  const passwordValue = watch("password") ?? "";

  const mutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: (response) => {
      login(response.token, response.user);
      pushToast({ type: "success", message: "Registration successful" });
      router.replace(getRoleRedirect(response.user.role));
    },
    onError: (error: { userMessage?: string; errorCode?: string }) => {
      const message =
        error.errorCode === "EMAIL_EXISTS"
          ? "Email already in use. Please use a different one."
          : error.userMessage ?? "Registration failed";
      pushToast({ type: "error", message });
    }
  });

  return (
    <div className="page-wrap flex justify-center">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-brand-900">Register</h1>
        <p className="mt-1 text-sm text-slate-600">Create your account and choose the role that matches your workflow.</p>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit((values) => mutation.mutate(values))}>
          <Input label="Name" {...register("name")} error={errors.name?.message} hint="Use your full name as it appears professionally." />
          <Input
            label="Email"
            {...register("email")}
            error={errors.email?.message}
            hint="Use an active email; account and login alerts are sent here."
          />
          <PasswordInput
            label="Password"
            {...register("password")}
            error={errors.password?.message}
            hint="Must be at least 6 characters. Use a strong mix for better security."
          />
          <div className="rounded-lg border border-brand-100 bg-brand-50 p-3 text-xs text-slate-700">
            <p className="font-semibold text-brand-900">Password checklist</p>
            <ul className="mt-2 space-y-1">
              <li className={passwordValue.length >= 6 ? "text-emerald-700" : ""}>- At least 6 characters</li>
              <li className={/[A-Za-z]/.test(passwordValue) ? "text-emerald-700" : ""}>- Include letters</li>
              <li className={/[0-9]/.test(passwordValue) ? "text-emerald-700" : ""}>- Include numbers</li>
            </ul>
          </div>
          <Select label="Role" {...register("role")} error={errors.role?.message}>
            <option value="jobseeker">Job Seeker</option>
            <option value="recruiter">Recruiter</option>
          </Select>
          <Input label="Phone (optional)" {...register("phone")} error={errors.phone?.message} hint="Optional. Helps recruiters/admin reach you quickly." />
          <div className="rounded-lg border border-brand-100 bg-white p-3 text-xs text-slate-700">
            By registering, you agree to use the platform responsibly with accurate profile and role details.
          </div>
          <Button isLoading={mutation.isPending} type="submit" className="w-full">
            Create Account
          </Button>
        </form>
        <p className="mt-4 text-sm text-slate-600">
          Already have an account? <Link className="text-brand-700" href="/login">Login</Link>
        </p>
      </Card>
    </div>
  );
}
