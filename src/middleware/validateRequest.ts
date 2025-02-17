import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const validateRequest = (schema: z.ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Validation failed",
          details: error.errors,
        });
      }
      next(error);
    }
  };
};

// Validation schemas for Bloq endpoints
export const createBloqSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    address: z.string().min(1, "Address is required"),
  }),
});

export const updateBloqSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid bloq ID"),
  }),
  body: z.object({
    title: z.string().min(1, "Title is required"),
    address: z.string().min(1, "Address is required"),
  }),
});

export const getBloqSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid bloq ID"),
  }),
});
