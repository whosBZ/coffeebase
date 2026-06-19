import { z } from "zod";
import { type Request } from "express";

// Zod Schemas
export const CafeDbSchema = z.object({
  id: z.coerce.number(),
  name: z.string().min(3),
  description: z.string().min(1),
  longitude: z.coerce.number().min(-180).max(180),
  latitude: z.coerce.number().min(-90).max(90),
});

// Schemas for request validation
export const CreateCafeRequestSchema = z.object({
  body: CafeDbSchema.omit({ id: true }),
});
222;
export const DeleteCafeRequestSchema = z.object({
  query: CafeDbSchema.pick({ id: true }),
});

export const UpdateCafeRequestSchema = z.object({
  body: CafeDbSchema,
});

// General Typescript types
export type Cafe = z.infer<typeof CafeDbSchema>;
export type NewCafe = Omit<Cafe, "id">;

// Types for overriding default express request objects
export type NoBodyRequest = Omit<Request, "body">;
export type CreateCafeRequestInput = NoBodyRequest &
  z.infer<typeof CreateCafeRequestSchema>;
export type DeleteCafeRequestInput = Request &
  z.infer<typeof DeleteCafeRequestSchema>;
export type UpdateCafeRequestInput = NoBodyRequest &
  z.infer<typeof UpdateCafeRequestSchema>;
