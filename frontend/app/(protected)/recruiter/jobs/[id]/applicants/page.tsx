"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { applicationApi } from "@/lib/api/applications";
import { DataTable } from "@/components/ui/DataTable";
import { Pagination } from "@/components/ui/Pagination";
import { EmptyState } from "@/components/ui/EmptyState";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { UpdateStatusModal } from "@/components/applications/UpdateStatusModal";

export default function ApplicantsPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState(1);
  const [selectedApplicationId, setSelectedApplicationId] = useState<string | null>(null);

  const query = useQuery({
    queryKey: ["job-applicants", id, page],
    queryFn: () => applicationApi.applicantsByJob(id, { page, limit: 10 })
  });

  return (
    <ProtectedRoute allowedRoles={["recruiter"]}>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-brand-900">Applicants</h1>
        {!query.data?.data?.length ? (
          <EmptyState title="No applicants yet" description="Applicants will appear once users apply." />
        ) : (
          <>
            <DataTable
              columns={[
                { key: "name", title: "Name", render: (row) => row.jobSeekerId?.name ?? "N/A" },
                { key: "email", title: "Email", render: (row) => row.jobSeekerId?.email ?? "N/A" },
                { key: "status", title: "Status", render: (row) => <Badge value={row.status} /> },
                {
                  key: "actions",
                  title: "Actions",
                  render: (row) => (
                    <Button variant="secondary" onClick={() => setSelectedApplicationId(row.id)}>
                      Update Status
                    </Button>
                  )
                }
              ]}
              rows={query.data.data}
            />
            <Pagination page={page} totalPages={query.data.pagination.totalPages} onChange={setPage} />
          </>
        )}
        {selectedApplicationId && (
          <UpdateStatusModal
            applicationId={selectedApplicationId}
            isOpen={Boolean(selectedApplicationId)}
            onClose={() => setSelectedApplicationId(null)}
          />
        )}
      </div>
    </ProtectedRoute>
  );
}
