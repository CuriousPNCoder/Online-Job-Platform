"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { JobFilters } from "@/lib/api/jobs";

type Props = {
  onSubmit: (filters: JobFilters) => void;
  defaultValues?: JobFilters;
};

export const JobFiltersForm = ({ onSubmit, defaultValues }: Props): JSX.Element => {
  const { register, handleSubmit } = useForm<JobFilters>({ defaultValues });

  return (
    <form className="grid gap-3 md:grid-cols-3" onSubmit={handleSubmit(onSubmit)}>
      <Input placeholder="Keyword" {...register("keyword")} />
      <Input placeholder="Location" {...register("location")} />
      <Input placeholder="Category" {...register("category")} />
      <Input placeholder="Min Salary" type="number" {...register("minSalary", { valueAsNumber: true })} />
      <Input placeholder="Max Salary" type="number" {...register("maxSalary", { valueAsNumber: true })} />
      <Select {...register("jobType")}>
        <option value="">All Job Types</option>
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
        <option value="Internship">Internship</option>
        <option value="Contract">Contract</option>
      </Select>
      <div className="md:col-span-3">
        <Button type="submit">Apply Filters</Button>
      </div>
    </form>
  );
};
