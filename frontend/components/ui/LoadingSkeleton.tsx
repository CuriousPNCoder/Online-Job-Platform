export const LoadingSkeleton = ({ rows = 4 }: { rows?: number }): JSX.Element => {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, idx) => (
        <div key={idx} className="h-14 animate-pulse rounded-lg bg-brand-100" />
      ))}
    </div>
  );
};
