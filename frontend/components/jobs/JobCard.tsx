import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Job } from "@/lib/types";

export const JobCard = ({ job, viewPath }: { job: Job; viewPath: string }): JSX.Element => (
  <Card>
    <div className="flex items-start justify-between gap-4">
      <div>
        <h3 className="text-lg font-semibold text-brand-900">{job.title}</h3>
        <p className="text-sm text-slate-600">{job.location}</p>
        <p className="mt-2 text-sm text-slate-700 line-clamp-2">{job.description}</p>
      </div>
      <div className="text-right text-sm text-slate-600">
        <p>{job.category}</p>
        <p>{job.jobType}</p>
      </div>
    </div>
    <div className="mt-4 flex items-center justify-between">
      <span className="text-sm font-semibold text-brand-800">
        {job.salaryRange.min} - {job.salaryRange.max} {job.salaryRange.currency ?? "USD"}
      </span>
      <Link className="text-sm font-semibold text-brand-700" href={`${viewPath}/${job.id}`}>
        View Details
      </Link>
    </div>
  </Card>
);
