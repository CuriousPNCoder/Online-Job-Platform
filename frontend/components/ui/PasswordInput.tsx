"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  hint?: string;
};

const EyeIcon = ({ open }: { open: boolean }): JSX.Element => {
  if (open) {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 3l18 18" />
        <path d="M10.6 10.6A2 2 0 0 0 13.4 13.4" />
        <path d="M9.9 4.2A10.3 10.3 0 0 1 12 4c6.4 0 9.6 8 9.6 8a15.4 15.4 0 0 1-4 5.2" />
        <path d="M6.2 6.2A15.6 15.6 0 0 0 2.4 12s3.2 8 9.6 8a10.3 10.3 0 0 0 2.1-.2" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2.4 12S5.6 4 12 4s9.6 8 9.6 8-3.2 8-9.6 8-9.6-8-9.6-8Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
};

export const PasswordInput = ({ label = "Password", error, hint, className, ...props }: Props): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <label className="block space-y-1">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <div className="relative">
        <input
          className={cn(
            "w-full rounded-md border border-brand-200 bg-white px-3 py-2 pr-11 text-sm outline-none ring-brand-300 placeholder:text-slate-400 focus:ring-2",
            error && "border-red-500",
            className
          )}
          type={showPassword ? "text" : "password"}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-slate-500 hover:bg-brand-50 hover:text-brand-800"
          aria-label={showPassword ? "Hide password" : "Show password"}
          title={showPassword ? "Hide password" : "Show password"}
        >
          <EyeIcon open={showPassword} />
        </button>
      </div>
      {error && <span className="text-xs text-red-600">{error}</span>}
      {!error && hint && <span className="text-xs text-slate-500">{hint}</span>}
    </label>
  );
};
