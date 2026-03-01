"use client";

import { useQuery } from "@tanstack/react-query";
import { adminApi } from "@/lib/api/admin";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Card } from "@/components/ui/Card";
import { StatCard } from "@/components/admin/StatCard";
import { HorizontalBarChart } from "@/components/admin/HorizontalBarChart";
import { ProgressPanel } from "@/components/admin/ProgressPanel";
import { DataTable } from "@/components/ui/DataTable";

export default function AdminDashboardPage(): JSX.Element {
  const query = useQuery({ queryKey: ["admin-summary"], queryFn: () => adminApi.reportSummary() });
  const usersQuery = useQuery({ queryKey: ["admin-dashboard-users"], queryFn: () => adminApi.users({ page: 1, limit: 5 }) });
  const jobsQuery = useQuery({ queryKey: ["admin-dashboard-jobs"], queryFn: () => adminApi.jobs({ page: 1, limit: 5 }) });
  const data = query.data?.data;

  const statusMap: Record<string, number> = {
    pending: 0,
    shortlisted: 0,
    rejected: 0,
    hired: 0
  };
  (data?.applicationStatusCounts ?? []).forEach((item) => {
    statusMap[item._id] = item.count;
  });

  const recruiterShare = data?.totalUsers ? Math.round(((data.totalRecruiters ?? 0) / data.totalUsers) * 100) : 0;
  const jobPerRecruiter = data?.totalRecruiters ? (data.totalJobs / data.totalRecruiters).toFixed(1) : "0.0";
  const applicationPerJob = data?.totalJobs ? (data.totalApplications / data.totalJobs).toFixed(1) : "0.0";

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-brand-900">Admin Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard label="Users" value={data?.totalUsers ?? 0} />
          <StatCard label="Recruiters" value={data?.totalRecruiters ?? 0} helper={`${recruiterShare}% of total users`} />
          <StatCard label="Jobs" value={data?.totalJobs ?? 0} helper={`${jobPerRecruiter} jobs / recruiter`} />
          <StatCard label="Applications" value={data?.totalApplications ?? 0} helper={`${applicationPerJob} applications / job`} />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <HorizontalBarChart
            title="Application Status Overview"
            items={[
              { label: "Pending", value: statusMap.pending, colorClass: "bg-amber-500" },
              { label: "Shortlisted", value: statusMap.shortlisted, colorClass: "bg-blue-600" },
              { label: "Rejected", value: statusMap.rejected, colorClass: "bg-red-500" },
              { label: "Hired", value: statusMap.hired, colorClass: "bg-emerald-600" }
            ]}
          />
          <ProgressPanel
            title="Platform Health Indicators"
            items={[
              { label: "Recruiter share in users", percent: recruiterShare, valueLabel: `${recruiterShare}%` },
              { label: "Jobs utilization", percent: Math.min(Number(jobPerRecruiter) * 20, 100), valueLabel: `${jobPerRecruiter} per recruiter` },
              {
                label: "Application engagement",
                percent: Math.min(Number(applicationPerJob) * 25, 100),
                valueLabel: `${applicationPerJob} per job`
              }
            ]}
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <h2 className="text-lg font-semibold text-brand-900">Recent Users</h2>
            <DataTable
              columns={[
                { key: "name", title: "Name" },
                { key: "email", title: "Email" },
                { key: "role", title: "Role" }
              ]}
              rows={usersQuery.data?.data ?? []}
            />
          </Card>
          <Card>
            <h2 className="text-lg font-semibold text-brand-900">Recent Jobs</h2>
            <DataTable
              columns={[
                { key: "title", title: "Title" },
                { key: "category", title: "Category" },
                { key: "status", title: "Status" }
              ]}
              rows={jobsQuery.data?.data ?? []}
            />
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}
