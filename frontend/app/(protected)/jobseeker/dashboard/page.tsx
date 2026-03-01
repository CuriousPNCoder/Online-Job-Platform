"use client";

import { useQuery } from "@tanstack/react-query";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/components/auth/AuthProvider";
import { applicationApi } from "@/lib/api/applications";
import { jobsApi } from "@/lib/api/jobs";
import { Card } from "@/components/ui/Card";

export default function JobSeekerDashboardPage(): JSX.Element {
  const { user } = useAuth();

  const jobsQuery = useQuery({ queryKey: ["dashboard-jobs"], queryFn: () => jobsApi.list({ page: 1, limit: 5 }) });
  const applicationsQuery = useQuery({
    queryKey: ["dashboard-applications"],
    queryFn: () => applicationApi.myApplications(1, 5)
  });

  return (
    <ProtectedRoute allowedRoles={["jobseeker"]}>
      <div className="space-y-5">
        <h1 className="text-2xl font-bold text-brand-900">Welcome, {user?.name}</h1>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <p className="text-sm text-slate-500">Open jobs</p>
            <p className="mt-1 text-2xl font-bold text-brand-800">{jobsQuery.data?.pagination.total ?? 0}</p>
          </Card>
          <Card>
            <p className="text-sm text-slate-500">My applications</p>
            <p className="mt-1 text-2xl font-bold text-brand-800">{applicationsQuery.data?.pagination.total ?? 0}</p>
          </Card>
          <Card>
            <p className="text-sm text-slate-500">Profile role</p>
            <p className="mt-1 text-2xl font-bold capitalize text-brand-800">{user?.role}</p>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}
