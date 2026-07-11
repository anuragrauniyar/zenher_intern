import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";

type ValidationTarget = "body" | "query" | "params";

export const validate = (schema: ZodSchema, target: ValidationTarget = "body") => 
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[target]);
    
    if (!result.success) {
      return next(new AppError(result.error.issues[0].message, 400));
    }

    if (target === "body") req.body = result.data;
    
    next();
};