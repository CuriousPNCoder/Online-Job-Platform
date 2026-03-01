"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/lib/api/admin";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { DataTable } from "@/components/ui/DataTable";
import { Pagination } from "@/components/ui/Pagination";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import { Select } from "@/components/ui/Select";
import { StatCard } from "@/components/admin/StatCard";
import { HorizontalBarChart } from "@/components/admin/HorizontalBarChart";

export default function ManageJobsPage(): JSX.Element {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<"" | "active" | "closed">("");
  const queryClient = useQueryClient();
  const { pushToast } = useToast();

  const query = useQuery({
    queryKey: ["admin-jobs", page, statusFilter],
    queryFn: () => adminApi.jobs({ page, limit: 10, status: statusFilter || undefined })
  });
  const allJobsQuery = useQuery({ queryKey: ["admin-jobs-all"], queryFn: () => adminApi.jobs({ page: 1, limit: 1 }) });
  const activeJobsQuery = useQuery({
    queryKey: ["admin-jobs-active"],
    queryFn: () => adminApi.jobs({ page: 1, limit: 1, status: "active" })
  });
  const closedJobsQuery = useQuery({
    queryKey: ["admin-jobs-closed"],
    queryFn: () => adminApi.jobs({ page: 1, limit: 1, status: "closed" })
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminApi.deleteJob(id),
    onSuccess: () => {
      pushToast({ type: "success", message: "Job deleted" });
      void queryClient.invalidateQueries({ queryKey: ["admin-jobs"] });
      void queryClient.invalidateQueries({ queryKey: ["admin-jobs-all"] });
      void queryClient.invalidateQueries({ queryKey: ["admin-jobs-active"] });
      void queryClient.invalidateQueries({ queryKey: ["admin-jobs-closed"] });
    },
    onError: (error: { userMessage?: string }) => pushToast({ type: "error", message: error.userMessage ?? "Delete failed" })
  });

  const totalJobs = allJobsQuery.data?.pagination.total ?? 0;
  const activeJobs = activeJobsQuery.data?.pagination.total ?? 0;
  const closedJobs = closedJobsQuery.data?.pagination.total ?? 0;

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-brand-900">Manage Jobs</h1>
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard label="Total Jobs" value={totalJobs} />
          <StatCard label="Active Jobs" value={activeJobs} helper="Visible to job seekers" />
          <StatCard label="Closed Jobs" value={closedJobs} helper="Not accepting applications" />
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <HorizontalBarChart
              title="Job Status Distribution"
              items={[
                { label: "Active", value: activeJobs, colorClass: "bg-emerald-600" },
                { label: "Closed", value: closedJobs, colorClass: "bg-slate-600" }
              ]}
            />
          </div>
          <div className="rounded-xl border border-brand-100 bg-white p-5">
            <h3 className="text-lg font-semibold text-brand-900">Filter Jobs</h3>
            <p className="mt-1 text-xs text-slate-600">View specific status for faster moderation.</p>
            <div className="mt-3">
              <Select
                label="Status"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value as "" | "active" | "closed");
                  setPage(1);
                }}
              >
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="closed">Closed</option>
              </Select>
            </div>
          </div>
        </div>
        <DataTable
          columns={[
            { key: "title", title: "Title" },
            { key: "location", title: "Location" },
            { key: "status", title: "Status", render: (row) => <Badge value={row.status} /> },
            {
              key: "actions",
              title: "Actions",
              render: (row) => (
                <Button variant="danger" onClick={() => deleteMutation.mutate(row.id)}>
                  Delete
                </Button>
              )
            }
          ]}
          rows={query.data?.data ?? []}
        />
        <Pagination page={page} totalPages={query.data?.pagination.totalPages ?? 1} onChange={setPage} />
      </div>
    </ProtectedRoute>
  );
}
