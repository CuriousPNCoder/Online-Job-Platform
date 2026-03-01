import { cn } from "@/lib/utils";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  hint?: string;
};

export const Input = ({ label, error, hint, className, ...props }: Props): JSX.Element => {
  return (
    <label className="block space-y-1">
      {label && <span className="text-sm font-medium text-slate-700">{label}</span>}
      <input
        className={cn(
          "w-full rounded-md border border-brand-200 bg-white px-3 py-2 text-sm outline-none ring-brand-300 placeholder:text-slate-400 focus:ring-2",
          error && "border-red-500",
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-red-600">{error}</span>}
      {!error && hint && <span className="text-xs text-slate-500">{hint}</span>}
    </label>
  );
};
