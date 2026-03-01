"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { applicationApi } from "@/lib/api/applications";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Pagination } from "@/components/ui/Pagination";
import { StatusBadge } from "@/components/applications/StatusBadge";

export default function MyApplicationsPage(): JSX.Element {
  const [page, setPage] = useState(1);

  const query = useQuery({
    queryKey: ["my-applications", page],
    queryFn: () => applicationApi.myApplications(page, 10)
  });

  return (
    <ProtectedRoute allowedRoles={["jobseeker"]}>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-brand-900">My Applications</h1>
        {!query.data?.data?.length ? (
          <EmptyState title="No applications yet" description="Apply to jobs to start tracking status." />
        ) : (
          <>
            <div className="space-y-3">
              {query.data.data.map((application) => {
                const job = application.jobId as { title?: string; location?: string };
                return (
                  <Card key={application.id}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-brand-900">{job.title ?? "Job"}</h3>
                        <p className="text-sm text-slate-600">{job.location ?? "N/A"}</p>
                      </div>
                      <StatusBadge status={application.status} />
                    </div>
                    {application.remarks && <p className="mt-3 text-sm text-slate-700">Remarks: {application.remarks}</p>}
                  </Card>
                );
              })}
            </div>
            <Pagination page={page} totalPages={query.data.pagination.totalPages} onChange={setPage} />
          </>
        )}
      </div>
    </ProtectedRoute>
  );
}
