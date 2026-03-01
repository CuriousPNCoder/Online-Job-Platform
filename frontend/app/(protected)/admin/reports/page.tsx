"use client";

import { useQuery } from "@tanstack/react-query";
import { adminApi } from "@/lib/api/admin";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Card } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { StatCard } from "@/components/admin/StatCard";
import { HorizontalBarChart } from "@/components/admin/HorizontalBarChart";
import { ProgressPanel } from "@/components/admin/ProgressPanel";

export default function ReportsPage(): JSX.Element {
  const query = useQuery({ queryKey: ["admin-reports"], queryFn: () => adminApi.reportSummary() });
  const report = query.data?.data;

  const statusMap: Record<string, number> = {
    pending: 0,
    shortlisted: 0,
    rejected: 0,
    hired: 0
  };
  (report?.applicationStatusCounts ?? []).forEach((item) => {
    statusMap[item._id] = item.count;
  });

  const hireRate = report?.totalApplications ? Math.round((statusMap.hired / report.totalApplications) * 100) : 0;
  const shortlistRate = report?.totalApplications ? Math.round((statusMap.shortlisted / report.totalApplications) * 100) : 0;
  const rejectionRate = report?.totalApplications ? Math.round((statusMap.rejected / report.totalApplications) * 100) : 0;

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-brand-900">Reports</h1>
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard label="Total Users" value={report?.totalUsers ?? 0} />
          <StatCard label="Total Recruiters" value={report?.totalRecruiters ?? 0} />
          <StatCard label="Total Jobs" value={report?.totalJobs ?? 0} />
          <StatCard label="Total Applications" value={report?.totalApplications ?? 0} />
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <HorizontalBarChart
            title="Application Status Counts"
            items={[
              { label: "Pending", value: statusMap.pending, colorClass: "bg-amber-500" },
              { label: "Shortlisted", value: statusMap.shortlisted, colorClass: "bg-blue-600" },
              { label: "Rejected", value: statusMap.rejected, colorClass: "bg-red-500" },
              { label: "Hired", value: statusMap.hired, colorClass: "bg-emerald-600" }
            ]}
          />
          <ProgressPanel
            title="Pipeline Conversion Rates"
            items={[
              { label: "Hire Rate", percent: hireRate, valueLabel: `${hireRate}%` },
              { label: "Shortlist Rate", percent: shortlistRate, valueLabel: `${shortlistRate}%` },
              { label: "Rejection Rate", percent: rejectionRate, valueLabel: `${rejectionRate}%` }
            ]}
          />
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <p className="text-sm font-semibold text-brand-900">Summary Metrics Table</p>
            <table className="mt-3 min-w-full text-sm">
              <tbody>
                <tr><td className="py-1 text-slate-600">Total Users</td><td className="font-semibold text-brand-900">{report?.totalUsers ?? 0}</td></tr>
                <tr><td className="py-1 text-slate-600">Total Recruiters</td><td className="font-semibold text-brand-900">{report?.totalRecruiters ?? 0}</td></tr>
                <tr><td className="py-1 text-slate-600">Total Jobs</td><td className="font-semibold text-brand-900">{report?.totalJobs ?? 0}</td></tr>
                <tr><td className="py-1 text-slate-600">Total Applications</td><td className="font-semibold text-brand-900">{report?.totalApplications ?? 0}</td></tr>
              </tbody>
            </table>
          </Card>
          <Card>
            <p className="text-sm font-semibold text-brand-900">Status Breakdown Table</p>
            <div className="mt-3">
              <DataTable columns={[{ key: "_id", title: "Status" }, { key: "count", title: "Count" }]} rows={report?.applicationStatusCounts ?? []} />
            </div>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}
