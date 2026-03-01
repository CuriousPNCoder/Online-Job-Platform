"use client";

import { useParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { jobsApi } from "@/lib/api/jobs";
import { applicationApi } from "@/lib/api/applications";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

export default function JobDetailsPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const { pushToast } = useToast();
  const query = useQuery({ queryKey: ["job", id], queryFn: () => jobsApi.byId(id) });

  const applyMutation = useMutation({
    mutationFn: () => applicationApi.apply(id),
    onSuccess: () => pushToast({ type: "success", message: "Application submitted" }),
    onError: (error: { userMessage?: string; errorCode?: string }) => {
      const message = error.errorCode === "DUPLICATE_APPLICATION" ? "You already applied for this job" : error.userMessage ?? "Failed to apply";
      pushToast({ type: "error", message });
    }
  });

  return (
    <ProtectedRoute allowedRoles={["jobseeker"]}>
      {!query.data ? (
        <div>Loading...</div>
      ) : (
        <Card>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-brand-900">{query.data.data.title}</h1>
            <Badge value={query.data.data.status} />
          </div>
          <p className="mt-1 text-sm text-slate-500">
            {query.data.data.location} | {query.data.data.category} | {query.data.data.jobType}
          </p>
          <p className="mt-4 whitespace-pre-wrap text-slate-700">{query.data.data.description}</p>
          <p className="mt-3 text-sm text-slate-700">Skills: {query.data.data.skillsRequired.join(", ")}</p>
          <p className="mt-3 text-sm font-semibold text-brand-900">
            Salary: {query.data.data.salaryRange.min} - {query.data.data.salaryRange.max} {query.data.data.salaryRange.currency ?? "USD"}
          </p>
          <div className="mt-5">
            <Button isLoading={applyMutation.isPending} onClick={() => applyMutation.mutate()}>
              Apply Now
            </Button>
          </div>
        </Card>
      )}
    </ProtectedRoute>
  );
}
