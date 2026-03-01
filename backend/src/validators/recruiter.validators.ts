import { z } from "zod";

const objectId = z.string().regex(/^[a-fA-F0-9]{24}$/);

export const updateRecruiterProfileSchema = z.object({
  body: z.object({
    companyName: z.string().min(2),
    website: z.string().url().optional(),
    location: z.string().min(2),
    description: z.string().optional()
  }),
  params: z.object({}),
  query: z.object({})
});

export const recruiterApplicantsQuerySchema = z.object({
  body: z.object({}),
  params: z.object({ id: objectId }),
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    status: z.enum(["pending", "shortlisted", "rejected", "hired"]).optional()
  })
});
