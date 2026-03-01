"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { apiClient } from "@/lib/api/client";
import { ApiSingleResponse, User } from "@/lib/types";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { seekerProfileSchema } from "@/lib/validation/schemas";
import { z } from "zod";

type FormValues = z.infer<typeof seekerProfileSchema>;

export default function JobSeekerProfilePage(): JSX.Element {
  const { pushToast } = useToast();
  const queryClient = useQueryClient();
  const [selectedResume, setSelectedResume] = useState<File | null>(null);
  const [resumeHint, setResumeHint] = useState("Upload PDF/DOC/DOCX (max 5MB).");

  const profileQuery = useQuery({
    queryKey: ["seeker-profile"],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiSingleResponse<User>>("/me/profile");
      return data.data;
    }
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({ resolver: zodResolver(seekerProfileSchema) });

  useEffect(() => {
    if (!profileQuery.data) {
      return;
    }
    reset({
      name: profileQuery.data.name,
      phone: profileQuery.data.phone ?? "",
      resumeUrl: profileQuery.data.resumeUrl ?? "",
      bio: profileQuery.data.bio ?? "",
      skills: profileQuery.data.skills?.join(",") ?? ""
    });
  }, [profileQuery.data, reset]);

  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const payload = {
        ...values,
        skills: values.skills ? values.skills.split(",").map((item) => item.trim()) : []
      };
      const { data } = await apiClient.put("/me/profile", payload);
      return data;
    },
    onSuccess: () => pushToast({ type: "success", message: "Profile updated" }),
    onError: (error: { userMessage?: string }) => pushToast({ type: "error", message: error.userMessage ?? "Update failed" })
  });

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("resume", file);
      const { data } = await apiClient.post<ApiSingleResponse<User>>("/me/resume", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      return data.data;
    },
    onSuccess: async (updatedUser) => {
      setSelectedResume(null);
      setResumeHint("Resume uploaded successfully.");
      reset({
        name: updatedUser.name,
        phone: updatedUser.phone ?? "",
        resumeUrl: updatedUser.resumeUrl ?? "",
        bio: updatedUser.bio ?? "",
        skills: updatedUser.skills?.join(",") ?? ""
      });
      await queryClient.invalidateQueries({ queryKey: ["seeker-profile"] });
      pushToast({ type: "success", message: "Resume uploaded successfully" });
    },
    onError: (error: { userMessage?: string }) => {
      pushToast({ type: "error", message: error.userMessage ?? "Resume upload failed" });
    }
  });

  const onResumeSelect = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0] ?? null;
    if (!file) {
      setSelectedResume(null);
      setResumeHint("Upload PDF/DOC/DOCX (max 5MB).");
      return;
    }

    const allowedTypes = new Set([
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ]);
    const maxBytes = 5 * 1024 * 1024;

    if (!allowedTypes.has(file.type)) {
      setSelectedResume(null);
      setResumeHint("Invalid file type. Use PDF, DOC, or DOCX.");
      return;
    }

    if (file.size > maxBytes) {
      setSelectedResume(null);
      setResumeHint("File too large. Max allowed size is 5MB.");
      return;
    }

    setSelectedResume(file);
    setResumeHint(`Selected: ${file.name}`);
  };

  return (
    <ProtectedRoute allowedRoles={["jobseeker"]}>
      <Card>
        <h1 className="text-2xl font-bold text-brand-900">Profile + Resume</h1>
        <div className="mt-4 rounded-lg border border-brand-100 bg-brand-50 p-4">
          <p className="text-sm font-semibold text-brand-900">Resume Upload</p>
          <p className="mt-1 text-xs text-slate-600">
            Upload your latest resume so recruiters can view the most recent version from your profile.
          </p>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={onResumeSelect}
              className="block w-full text-sm text-slate-700 file:mr-3 file:rounded-md file:border-0 file:bg-brand-700 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-brand-800"
            />
            <Button
              type="button"
              isLoading={uploadMutation.isPending}
              onClick={() => selectedResume && uploadMutation.mutate(selectedResume)}
              disabled={!selectedResume}
            >
              Upload Resume
            </Button>
          </div>
          <p className="mt-2 text-xs text-slate-600">{resumeHint}</p>
          {profileQuery.data?.resumeUrl && (
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href={profileQuery.data.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-brand-200 px-3 py-1.5 text-xs font-semibold text-brand-800"
              >
                View Current Resume
              </a>
              <a
                href={profileQuery.data.resumeUrl}
                download
                className="rounded-md border border-brand-200 px-3 py-1.5 text-xs font-semibold text-brand-800"
              >
                Download Resume
              </a>
            </div>
          )}
        </div>
        <form className="mt-5 space-y-4" onSubmit={handleSubmit((values) => mutation.mutate(values))}>
          <Input label="Name" {...register("name")} error={errors.name?.message} />
          <Input label="Phone" {...register("phone")} error={errors.phone?.message} />
          <Input
            label="Resume URL"
            {...register("resumeUrl")}
            error={errors.resumeUrl?.message}
            hint="Auto-filled after upload. You can still set a custom public URL."
          />
          <Input label="Skills (comma separated)" {...register("skills")} error={errors.skills?.message} />
          <Textarea label="Bio" {...register("bio")} error={errors.bio?.message} />
          <Button isLoading={mutation.isPending} type="submit">
            Save Profile
          </Button>
        </form>
      </Card>
    </ProtectedRoute>
  );
}
