type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

export const Textarea = ({ label, error, ...props }: Props): JSX.Element => {
  return (
    <label className="block space-y-1">
      {label && <span className="text-sm font-medium text-slate-700">{label}</span>}
      <textarea
        className="min-h-32 w-full rounded-md border border-brand-200 bg-white px-3 py-2 text-sm outline-none ring-brand-300 focus:ring-2"
        {...props}
      />
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  );
};
