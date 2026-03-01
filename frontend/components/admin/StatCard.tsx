import { Card } from "@/components/ui/Card";

type Props = {
  label: string;
  value: number | string;
  helper?: string;
};

export const StatCard = ({ label, value, helper }: Props): JSX.Element => {
  return (
    <Card className="bg-gradient-to-br from-white to-brand-50">
      <p className="text-sm font-medium text-slate-600">{label}</p>
      <p className="mt-2 text-3xl font-bold text-brand-800">{value}</p>
      {helper && <p className="mt-1 text-xs text-slate-500">{helper}</p>}
    </Card>
  );
};
