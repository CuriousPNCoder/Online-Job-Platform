"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { jobsApi } from "@/lib/api/jobs";
import { JobFiltersForm } from "@/components/jobs/JobFiltersForm";
import { JobCard } from "@/components/jobs/JobCard";
import { Pagination } from "@/components/ui/Pagination";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { EmptyState } from "@/components/ui/EmptyState";

export default function PublicJobsPage(): JSX.Element {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<Record<string, unknown>>({});

  const query = useQuery({
    queryKey: ["public-jobs", page, filters],
    queryFn: () => jobsApi.list({ ...(filters as Record<string, never>), page, limit: 10 })
  });

  return (
    <div className="page-wrap space-y-6">
      <h1 className="text-3xl font-bold text-brand-900">Browse Jobs</h1>
      <JobFiltersForm
        onSubmit={(values) => {
          setFilters(values);
          setPage(1);
        }}
      />

      {query.isLoading ? (
        <LoadingSkeleton rows={5} />
      ) : query.data?.data?.length ? (
        <div className="space-y-4">
          {query.data.data.map((job) => (
            <JobCard key={job.id} job={job} viewPath="/jobs" />
          ))}
          <Pagination page={page} totalPages={query.data.pagination.totalPages} onChange={setPage} />
        </div>
      ) : (
        <EmptyState title="No jobs found" description="Try changing search filters." />
      )}
    </div>
  );
}
