import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError.js'; // Adjust path if necessary

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Log unexpected programming errors for debugging
  console.error('Unhandled Error:', err);

  return res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
};