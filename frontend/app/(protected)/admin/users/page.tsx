"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/lib/api/admin";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { DataTable } from "@/components/ui/DataTable";
import { Pagination } from "@/components/ui/Pagination";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { Select } from "@/components/ui/Select";
import { StatCard } from "@/components/admin/StatCard";
import { HorizontalBarChart } from "@/components/admin/HorizontalBarChart";

export default function ManageUsersPage(): JSX.Element {
  const [page, setPage] = useState(1);
  const [roleFilter, setRoleFilter] = useState("");
  const queryClient = useQueryClient();
  const { pushToast } = useToast();

  const query = useQuery({
    queryKey: ["admin-users", page, roleFilter],
    queryFn: () => adminApi.users({ page, limit: 10, role: roleFilter || undefined })
  });
  const allUsersQuery = useQuery({ queryKey: ["admin-users-all"], queryFn: () => adminApi.users({ page: 1, limit: 1 }) });
  const recruiterQuery = useQuery({
    queryKey: ["admin-users-recruiter"],
    queryFn: () => adminApi.users({ page: 1, limit: 1, role: "recruiter" })
  });
  const jobseekerQuery = useQuery({
    queryKey: ["admin-users-jobseeker"],
    queryFn: () => adminApi.users({ page: 1, limit: 1, role: "jobseeker" })
  });
  const adminQuery = useQuery({
    queryKey: ["admin-users-admin"],
    queryFn: () => adminApi.users({ page: 1, limit: 1, role: "admin" })
  });

  const disableMutation = useMutation({
    mutationFn: (id: string) => adminApi.disableUser(id),
    onSuccess: () => {
      pushToast({ type: "success", message: "User disabled" });
      void queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      void queryClient.invalidateQueries({ queryKey: ["admin-users-all"] });
      void queryClient.invalidateQueries({ queryKey: ["admin-users-recruiter"] });
      void queryClient.invalidateQueries({ queryKey: ["admin-users-jobseeker"] });
      void queryClient.invalidateQueries({ queryKey: ["admin-users-admin"] });
    },
    onError: (error: { userMessage?: string }) => pushToast({ type: "error", message: error.userMessage ?? "Action failed" })
  });

  const totalUsers = allUsersQuery.data?.pagination.total ?? 0;
  const totalRecruiters = recruiterQuery.data?.pagination.total ?? 0;
  const totalJobSeekers = jobseekerQuery.data?.pagination.total ?? 0;
  const totalAdmins = adminQuery.data?.pagination.total ?? 0;

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-brand-900">Manage Users</h1>
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard label="Total Users" value={totalUsers} />
          <StatCard label="Job Seekers" value={totalJobSeekers} />
          <StatCard label="Recruiters" value={totalRecruiters} />
          <StatCard label="Admins" value={totalAdmins} />
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <HorizontalBarChart
              title="User Role Distribution"
              items={[
                { label: "Job Seekers", value: totalJobSeekers, colorClass: "bg-brand-600" },
                { label: "Recruiters", value: totalRecruiters, colorClass: "bg-blue-600" },
                { label: "Admins", value: totalAdmins, colorClass: "bg-slate-700" }
              ]}
            />
          </div>
          <div className="rounded-xl border border-brand-100 bg-white p-5">
            <h3 className="text-lg font-semibold text-brand-900">Filter Users</h3>
            <p className="mt-1 text-xs text-slate-600">Filter table by role to review user groups quickly.</p>
            <div className="mt-3">
              <Select
                label="Role"
                value={roleFilter}
                onChange={(e) => {
                  setRoleFilter(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">All Roles</option>
                <option value="jobseeker">Job Seeker</option>
                <option value="recruiter">Recruiter</option>
                <option value="admin">Admin</option>
              </Select>
            </div>
          </div>
        </div>
        <DataTable
          columns={[
            { key: "name", title: "Name" },
            { key: "email", title: "Email" },
            { key: "role", title: "Role" },
            {
              key: "actions",
              title: "Actions",
              render: (row) => (
                <Button variant="danger" onClick={() => disableMutation.mutate(row.id)}>
                  Disable
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
