import { z } from "zod";

const objectId = z.string().regex(/^[a-fA-F0-9]{24}$/);

export const adminUsersQuerySchema = z.object({
  body: z.object({}),
  params: z.object({}),
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    role: z.enum(["jobseeker", "recruiter", "admin"]).optional()
  })
});

export const adminJobsQuerySchema = z.object({
  body: z.object({}),
  params: z.object({}),
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    status: z.enum(["active", "closed"]).optional()
  })
});

export const adminIdParamSchema = z.object({
  body: z.object({}),
  params: z.object({ id: objectId }),
  query: z.object({})
});
