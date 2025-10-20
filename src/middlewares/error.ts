import type { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/messages.ts";
import z from "zod";

export default function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err) {
    // TODO: log the error using the logger
    let message = err.message || "Internal Server Error";
    let body = err;
    let code = 500;

    if (err instanceof z.ZodRealError) {
      message = err.message || "Validation Error";
      code = 422;
    }

    const errorBody = errorResponse(message, body);
    res.status(code).json(errorBody);
  }
}
