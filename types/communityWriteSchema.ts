import { z } from "zod";

export const WRITE_FORM_SCHEMA = z.object({
  title: z.string().min(1).max(30),
  content: z.string().min(1),
  image: z.string().nullable().optional(),
});

export type WriteFormValues = z.infer<typeof WRITE_FORM_SCHEMA>;
