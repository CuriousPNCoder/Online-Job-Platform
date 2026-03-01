import { z } from "zod";

export const updateMeProfileSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    phone: z.string().optional(),
    resumeUrl: z.string().url().optional(),
    bio: z.string().optional(),
    skills: z.array(z.string().min(1)).optional()
  }),
  params: z.object({}),
  query: z.object({})
});

export const myApplicationsQuerySchema = z.object({
  body: z.object({}),
  params: z.object({}),
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional()
  })
});
