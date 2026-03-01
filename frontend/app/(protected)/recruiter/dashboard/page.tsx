"use client";

import { useQuery } from "@tanstack/react-query";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { recruiterApi } from "@/lib/api/recruiter";
import { applicationApi } from "@/lib/api/applications";
import { Card } from "@/components/ui/Card";

export default function RecruiterDashboardPage(): JSX.Element {
  const jobsQuery = useQuery({ queryKey: ["recruiter-jobs-dashboard"], queryFn: () => recruiterApi.myJobs(1, 5) });

  const sampleJobId = jobsQuery.data?.data?.[0]?.id;
  const applicantsQuery = useQuery({
    queryKey: ["recruiter-applicants-dashboard", sampleJobId],
    enabled: Boolean(sampleJobId),
    queryFn: () => applicationApi.applicantsByJob(sampleJobId as string, { page: 1, limit: 5 })
  });

  return (
    <ProtectedRoute allowedRoles={["recruiter"]}>
      <div className="space-y-5">
        <h1 className="text-2xl font-bold text-brand-900">Recruiter Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <p className="text-sm text-slate-500">My posted jobs</p>
            <p className="mt-1 text-2xl font-bold text-brand-800">{jobsQuery.data?.pagination.total ?? 0}</p>
          </Card>
          <Card>
            <p className="text-sm text-slate-500">Applicants (latest job)</p>
            <p className="mt-1 text-2xl font-bold text-brand-800">{applicantsQuery.data?.pagination.total ?? 0}</p>
          </Card>
          <Card>
            <p className="text-sm text-slate-500">Current focus</p>
            <p className="mt-1 text-lg font-semibold text-brand-800">Pipeline review</p>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}
