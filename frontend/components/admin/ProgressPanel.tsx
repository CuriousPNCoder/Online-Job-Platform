import { Card } from "@/components/ui/Card";

type Item = {
  label: string;
  percent: number;
  valueLabel: string;
};

type Props = {
  title: string;
  items: Item[];
};

export const ProgressPanel = ({ title, items }: Props): JSX.Element => {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-brand-900">{title}</h3>
      <div className="mt-4 space-y-4">
        {items.map((item) => (
          <div key={item.label} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-slate-700">{item.label}</span>
              <span className="font-semibold text-brand-800">{item.valueLabel}</span>
            </div>
            <div className="h-2.5 rounded-full bg-brand-100">
              <div className="h-2.5 rounded-full bg-brand-700" style={{ width: `${Math.min(Math.max(item.percent, 0), 100)}%` }} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
