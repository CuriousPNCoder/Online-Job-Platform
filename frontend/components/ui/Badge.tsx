import { ApplicationStatus, JobStatus } from "@/lib/types";

type Props = { value: ApplicationStatus | JobStatus };

export const Badge = ({ value }: Props): JSX.Element => {
  const colorMap: Record<string, string> = {
    pending: "bg-amber-100 text-amber-700",
    shortlisted: "bg-blue-100 text-blue-700",
    rejected: "bg-red-100 text-red-700",
    hired: "bg-emerald-100 text-emerald-700",
    active: "bg-emerald-100 text-emerald-700",
    closed: "bg-slate-200 text-slate-700"
  };

  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${colorMap[value]}`}>{value}</span>;
};
