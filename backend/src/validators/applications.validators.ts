import { z } from "zod";

const objectId = z.string().regex(/^[a-fA-F0-9]{24}$/);

export const applyJobSchema = z.object({
  body: z.object({}),
  params: z.object({ id: objectId }),
  query: z.object({})
});

export const updateApplicationStatusSchema = z.object({
  body: z.object({
    status: z.enum(["pending", "shortlisted", "rejected", "hired"]),
    remarks: z.string().optional()
  }),
  params: z.object({ id: objectId }),
  query: z.object({})
});
