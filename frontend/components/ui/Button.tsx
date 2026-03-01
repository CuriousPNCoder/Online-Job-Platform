"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  isLoading?: boolean;
  children: ReactNode;
};

export const Button = ({ variant = "primary", isLoading = false, className, children, ...props }: Props): JSX.Element => {
  const style = {
    primary: "bg-brand-700 text-white hover:bg-brand-800",
    secondary: "bg-white text-brand-800 border border-brand-200 hover:bg-brand-50",
    danger: "bg-red-600 text-white hover:bg-red-700",
    ghost: "bg-transparent text-brand-800 hover:bg-brand-100"
  }[variant];

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60",
        style,
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? "Please wait..." : children}
    </button>
  );
};
