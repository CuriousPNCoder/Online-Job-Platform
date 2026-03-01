"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { jobSchema } from "@/lib/validation/schemas";
import { recruiterApi } from "@/lib/api/recruiter";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { jobTypeOptions, seniorityOptions, teamCategories, templatesByCategory } from "@/lib/jobTemplates";

type FormValues = z.infer<typeof jobSchema>;

const parseJobPayload = (values: FormValues) => ({
  title: values.title,
  description: values.description,
  skillsRequired: values.skillsRequired.split(",").map((item) => item.trim()),
  location: values.location,
  salaryRange: { min: values.salaryMin, max: values.salaryMax, currency: "USD" },
  category: values.category,
  jobType: values.jobType,
  status: values.status ?? "active"
});

export default function CreateJobPage(): JSX.Element {
  const router = useRouter();
  const { pushToast } = useToast();
  const [seniorityLevel, setSeniorityLevel] = useState("Mid-Level");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: { status: "active", category: "IT", jobType: "Full-time" }
  });
  const selectedCategory = watch("category") as keyof typeof templatesByCategory;
  const selectedSkills = watch("skillsRequired") ?? "";

  const activeTemplate = useMemo(() => {
    if (!selectedCategory || !(selectedCategory in templatesByCategory)) {
      return null;
    }
    return templatesByCategory[selectedCategory];
  }, [selectedCategory]);

  const addSkillSuggestion = (skill: string): void => {
    const current = selectedSkills
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    if (!current.includes(skill)) {
      current.push(skill);
    }

    setValue("skillsRequired", current.join(", "), { shouldValidate: true, shouldDirty: true });
  };

  const applyRoleSuggestion = (role: string, seniority: string): void => {
    const finalTitle = `${seniority} ${role}`.trim();
    setValue("title", finalTitle, { shouldValidate: true, shouldDirty: true });
  };

  const mutation = useMutation({
    mutationFn: (values: FormValues) => recruiterApi.createJob(parseJobPayload(values)),
    onSuccess: () => {
      pushToast({ type: "success", message: "Job created" });
      router.push("/recruiter/jobs");
    },
    onError: (error: { userMessage?: string }) => pushToast({ type: "error", message: error.userMessage ?? "Create failed" })
  });

  return (
    <ProtectedRoute allowedRoles={["recruiter"]}>
      <Card>
        <h1 className="text-2xl font-bold text-brand-900">Create Job</h1>
        <p className="mt-1 text-sm text-slate-600">
          Use team templates and suggestions to create consistent, high-quality job posts.
        </p>
        <div className="mt-4 rounded-lg border border-brand-100 bg-brand-50 p-4">
          <p className="text-sm font-semibold text-brand-900">Smart Job Setup</p>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            <Select label="Team Category" value={selectedCategory} onChange={(e) => setValue("category", e.target.value, { shouldValidate: true })}>
              {teamCategories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
            <Select label="Role Suggestion" onChange={(e) => e.target.value && applyRoleSuggestion(e.target.value, seniorityLevel)}>
              <option value="">Select role</option>
              {activeTemplate?.roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </Select>
            <Select
              label="Seniority"
              value={seniorityLevel}
              onChange={(e) => setSeniorityLevel(e.target.value)}
            >
              {seniorityOptions.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </Select>
          </div>
          <p className="mt-3 text-xs text-slate-600">
            Tip: choose a role suggestion first, then adjust title and description to your exact requirement.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {activeTemplate?.skills.map((skill) => (
              <button
                type="button"
                key={skill}
                onClick={() => addSkillSuggestion(skill)}
                className="rounded-full border border-brand-200 bg-white px-3 py-1 text-xs font-semibold text-brand-800"
              >
                + {skill}
              </button>
            ))}
          </div>
        </div>
        <form className="mt-4 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit((values) => mutation.mutate(values))}>
          <Input label="Title" {...register("title")} error={errors.title?.message} hint="Example: Senior Backend Developer" />
          <Input label="Location" {...register("location")} error={errors.location?.message} hint="Example: Bangalore / Remote" />
          <Select label="Category" {...register("category")} error={errors.category?.message}>
            {teamCategories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
          <Select label="Job Type" {...register("jobType")} error={errors.jobType?.message}>
            {jobTypeOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
          <Input
            label="Skills (comma separated)"
            {...register("skillsRequired")}
            error={errors.skillsRequired?.message}
            hint="Click suggestion chips above to auto-add skills."
          />
          <Select label="Status" {...register("status")} error={errors.status?.message}>
            <option value="active">Active</option>
            <option value="closed">Closed</option>
          </Select>
          <Input label="Salary Min" type="number" {...register("salaryMin")} error={errors.salaryMin?.message} hint="Use monthly or annual value consistently." />
          <Input label="Salary Max" type="number" {...register("salaryMax")} error={errors.salaryMax?.message} hint="Set realistic band for better candidate quality." />
          <div className="md:col-span-2">
            <Textarea
              label="Description"
              {...register("description")}
              error={errors.description?.message}
              placeholder={activeTemplate?.descriptionHint}
            />
          </div>
          <div className="md:col-span-2 rounded-lg border border-brand-100 bg-white p-3 text-xs text-slate-700">
            Post quality checklist: define responsibilities, required skills, expected outcomes, and salary clarity.
          </div>
          <div className="md:col-span-2">
            <Button isLoading={mutation.isPending} type="submit">
              Create Job
            </Button>
          </div>
        </form>
      </Card>
    </ProtectedRoute>
  );
}
