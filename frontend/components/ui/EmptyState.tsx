export const EmptyState = ({ title, description }: { title: string; description: string }): JSX.Element => (
  <div className="rounded-xl border border-dashed border-brand-200 bg-white p-8 text-center">
    <h3 className="text-lg font-semibold text-brand-900">{title}</h3>
    <p className="mt-2 text-sm text-slate-600">{description}</p>
  </div>
);
