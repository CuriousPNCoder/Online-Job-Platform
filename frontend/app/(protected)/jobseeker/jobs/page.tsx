"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { jobsApi, JobFilters } from "@/lib/api/jobs";
import { JobCard } from "@/components/jobs/JobCard";
import { JobFiltersForm } from "@/components/jobs/JobFiltersForm";
import { Pagination } from "@/components/ui/Pagination";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";

export default function JobSeekerJobsPage(): JSX.Element {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<JobFilters>({});

  const query = useQuery({
    queryKey: ["seeker-jobs", page, filters],
    queryFn: () => jobsApi.list({ ...filters, page, limit: 10 })
  });

  return (
    <ProtectedRoute allowedRoles={["jobseeker"]}>
      <div className="space-y-5">
        <h1 className="text-2xl font-bold text-brand-900">Search Jobs</h1>
        <JobFiltersForm
          defaultValues={filters}
          onSubmit={(next) => {
            setFilters(next);
            setPage(1);
          }}
        />
        {query.isLoading ? (
          <LoadingSkeleton rows={5} />
        ) : query.data?.data?.length ? (
          <>
            <div className="space-y-3">
              {query.data.data.map((job) => (
                <JobCard key={job.id} job={job} viewPath="/jobseeker/jobs" />
              ))}
            </div>
            <Pagination page={page} totalPages={query.data.pagination.totalPages} onChange={setPage} />
          </>
        ) : (
          <EmptyState title="No jobs available" description="Try changing filter criteria." />
        )}
      </div>
    </ProtectedRoute>
  );
}
