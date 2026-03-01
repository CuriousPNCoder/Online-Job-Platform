"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { recruiterApi } from "@/lib/api/recruiter";
import { recruiterProfileSchema } from "@/lib/validation/schemas";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

type FormValues = z.infer<typeof recruiterProfileSchema>;

export default function CompanyProfilePage(): JSX.Element {
  const { pushToast } = useToast();
  const profileQuery = useQuery({ queryKey: ["recruiter-profile"], queryFn: () => recruiterApi.getProfile() });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({ resolver: zodResolver(recruiterProfileSchema) });

  useEffect(() => {
    const profile = profileQuery.data?.data;
    if (!profile) {
      return;
    }
    reset({
      companyName: profile.companyName,
      website: profile.website ?? "",
      location: profile.location,
      description: profile.description ?? ""
    });
  }, [profileQuery.data, reset]);

  const mutation = useMutation({
    mutationFn: (values: FormValues) => recruiterApi.upsertProfile(values),
    onSuccess: () => pushToast({ type: "success", message: "Company profile saved" }),
    onError: (error: { userMessage?: string }) => pushToast({ type: "error", message: error.userMessage ?? "Save failed" })
  });

  return (
    <ProtectedRoute allowedRoles={["recruiter"]}>
      <Card>
        <h1 className="text-2xl font-bold text-brand-900">Company Profile</h1>
        <form className="mt-5 space-y-4" onSubmit={handleSubmit((values) => mutation.mutate(values))}>
          <Input label="Company Name" {...register("companyName")} error={errors.companyName?.message} />
          <Input label="Website" {...register("website")} error={errors.website?.message} />
          <Input label="Location" {...register("location")} error={errors.location?.message} />
          <Textarea label="Description" {...register("description")} error={errors.description?.message} />
          <Button isLoading={mutation.isPending} type="submit">
            Save Profile
          </Button>
        </form>
      </Card>
    </ProtectedRoute>
  );
}
