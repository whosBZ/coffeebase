import type { ZodSchema } from "zod/v3";
import { type Request, type Response, type NextFunction } from "express";

const validate =
  (schema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      return res.status(400).json({
        status: "fail",
        errors: JSON.parse(error.message).map((err) => ({
          path: err.path,
          message: err.message,
        })),
      });
    }
  };

export { validate };
