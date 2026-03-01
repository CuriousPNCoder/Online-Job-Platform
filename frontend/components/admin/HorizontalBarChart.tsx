import { Card } from "@/components/ui/Card";

type Item = {
  label: string;
  value: number;
  colorClass?: string;
};

type Props = {
  title: string;
  items: Item[];
};

export const HorizontalBarChart = ({ title, items }: Props): JSX.Element => {
  const maxValue = Math.max(...items.map((item) => item.value), 1);

  return (
    <Card>
      <h3 className="text-lg font-semibold text-brand-900">{title}</h3>
      <div className="mt-4 space-y-3">
        {items.map((item) => {
          const widthPercent = Math.max((item.value / maxValue) * 100, item.value > 0 ? 8 : 0);
          return (
            <div key={item.label} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-700">{item.label}</span>
                <span className="font-semibold text-brand-800">{item.value}</span>
              </div>
              <div className="h-2.5 rounded-full bg-brand-100">
                <div
                  className={`h-2.5 rounded-full ${item.colorClass ?? "bg-brand-700"}`}
                  style={{ width: `${widthPercent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
