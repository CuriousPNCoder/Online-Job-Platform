"use client";

import Link from "next/link";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { recruiterApi } from "@/lib/api/recruiter";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Pagination } from "@/components/ui/Pagination";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";

export default function RecruiterJobsPage(): JSX.Element {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const { pushToast } = useToast();

  const query = useQuery({
    queryKey: ["recruiter-jobs", page],
    queryFn: () => recruiterApi.myJobs(page, 10)
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => recruiterApi.deleteJob(id),
    onSuccess: () => {
      pushToast({ type: "success", message: "Job deleted" });
      void queryClient.invalidateQueries({ queryKey: ["recruiter-jobs"] });
    },
    onError: (error: { userMessage?: string }) => pushToast({ type: "error", message: error.userMessage ?? "Delete failed" })
  });

  return (
    <ProtectedRoute allowedRoles={["recruiter"]}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-brand-900">My Jobs</h1>
          <Link className="rounded-md bg-brand-700 px-4 py-2 text-sm font-semibold text-white" href="/recruiter/jobs/new">
            Create Job
          </Link>
        </div>

        {!query.data?.data?.length ? (
          <EmptyState title="No jobs posted" description="Create your first job posting." />
        ) : (
          <>
            <div className="space-y-3">
              {query.data.data.map((job) => (
                <Card key={job.id}>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-brand-900">{job.title}</h3>
                      <p className="text-sm text-slate-600">{job.location} | {job.jobType}</p>
                    </div>
                    <Badge value={job.status} />
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Link className="rounded border border-brand-200 px-3 py-1.5 text-sm text-brand-800" href={`/recruiter/jobs/${job.id}/edit`}>
                      Edit
                    </Link>
                    <Link className="rounded border border-brand-200 px-3 py-1.5 text-sm text-brand-800" href={`/recruiter/jobs/${job.id}/applicants`}>
                      Applicants
                    </Link>
                    <Button variant="danger" onClick={() => deleteMutation.mutate(job.id)}>
                      Delete
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
            <Pagination page={page} totalPages={query.data.pagination.totalPages} onChange={setPage} />
          </>
        )}
      </div>
    </ProtectedRoute>
  );
}
