import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const Card = ({ children, className }: { children: ReactNode; className?: string }): JSX.Element => (
  <div className={cn("rounded-xl border border-brand-100 bg-white p-5 shadow-card", className)}>{children}</div>
);
