type Props = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export const Pagination = ({ page, totalPages, onChange }: Props): JSX.Element | null => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <button
        className="rounded border border-brand-200 px-3 py-1 text-sm disabled:opacity-40"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
      >
        Prev
      </button>
      <span className="text-sm text-slate-600">
        Page {page} / {totalPages}
      </span>
      <button
        className="rounded border border-brand-200 px-3 py-1 text-sm disabled:opacity-40"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
};
