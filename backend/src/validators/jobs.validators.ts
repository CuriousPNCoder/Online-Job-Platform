import { z } from "zod";

const objectId = z.string().regex(/^[a-fA-F0-9]{24}$/);

const salaryRangeSchema = z
  .object({
    min: z.number().nonnegative(),
    max: z.number().nonnegative(),
    currency: z.string().default("USD")
  })
  .refine((val) => val.max >= val.min, {
    message: "salaryRange.max must be greater than or equal to salaryRange.min"
  });

export const listJobsSchema = z.object({
  body: z.object({}),
  params: z.object({}),
  query: z.object({
    keyword: z.string().optional(),
    location: z.string().optional(),
    category: z.string().optional(),
    jobType: z.string().optional(),
    minSalary: z.string().optional(),
    maxSalary: z.string().optional(),
    page: z.string().optional(),
    limit: z.string().optional()
  })
});

export const jobIdParamSchema = z.object({
  body: z.object({}),
  params: z.object({ id: objectId }),
  query: z.object({})
});

export const createJobSchema = z.object({
  body: z.object({
    title: z.string().min(2),
    description: z.string().min(10),
    skillsRequired: z.array(z.string().min(1)).min(1),
    location: z.string().min(2),
    salaryRange: salaryRangeSchema,
    category: z.string().min(2),
    jobType: z.string().min(2),
    status: z.enum(["active", "closed"]).optional()
  }),
  params: z.object({}),
  query: z.object({})
});

export const updateJobSchema = z.object({
  body: z.object({
    title: z.string().min(2).optional(),
    description: z.string().min(10).optional(),
    skillsRequired: z.array(z.string().min(1)).min(1).optional(),
    location: z.string().min(2).optional(),
    salaryRange: salaryRangeSchema.optional(),
    category: z.string().min(2).optional(),
    jobType: z.string().min(2).optional(),
    status: z.enum(["active", "closed"]).optional()
  }),
  params: z.object({ id: objectId }),
  query: z.object({})
});

export const recruiterJobsQuerySchema = z.object({
  body: z.object({}),
  params: z.object({}),
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional()
  })
});
