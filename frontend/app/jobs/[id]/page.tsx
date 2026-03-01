"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { jobsApi } from "@/lib/api/jobs";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function PublicJobDetailsPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const query = useQuery({
    queryKey: ["public-job", id],
    queryFn: () => jobsApi.byId(id)
  });

  if (query.isLoading) {
    return <div className="page-wrap">Loading...</div>;
  }

  if (!query.data) {
    return <div className="page-wrap">Job not found</div>;
  }

  const job = query.data.data;

  return (
    <div className="page-wrap">
      <Card>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-brand-900">{job.title}</h1>
          <Badge value={job.status} />
        </div>
        <p className="mt-2 text-sm text-slate-500">
          {job.location} | {job.category} | {job.jobType}
        </p>
        <p className="mt-4 whitespace-pre-wrap text-slate-700">{job.description}</p>
        <div className="mt-4">
          <h2 className="font-semibold text-brand-800">Skills</h2>
          <p className="text-slate-700">{job.skillsRequired.join(", ")}</p>
        </div>
        <p className="mt-4 font-semibold text-brand-900">
          Salary: {job.salaryRange.min} - {job.salaryRange.max} {job.salaryRange.currency ?? "USD"}
        </p>
        <Link className="mt-5 inline-block rounded-md bg-brand-700 px-4 py-2 text-sm font-semibold text-white" href="/login">
          Login to Apply
        </Link>
      </Card>
    </div>
  );
}
