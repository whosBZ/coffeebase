import { z } from "zod";

export const CafeDbSchema = z.object({
  id: z.number(),
  name: z.string().min(3),
  description: z.string().min(1),
  longitude: z.number().min(-180).max(180),
  latitude: z.number().min(-90).max(90),
});

export const CreateCafeRequestSchema = z.object({
  body: CafeDbSchema.omit({ id: true }),
});

export type Cafe = z.infer<typeof CafeDbSchema>;
export type CreateCafeInput = z.infer<typeof CreateCafeRequestSchema>;
