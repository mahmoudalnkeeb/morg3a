import type { Request, Response, NextFunction } from "express";
import { errorResponse } from "@/utils/messages";
import z from "zod";
import { NotFoundError } from "@/utils/errors";

export default function errorHandler(
  err: Error | NotFoundError | z.ZodError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err) {
    // TODO: log the error using the logger
    let message = err.message || "Internal Server Error";
    let body = {};
    let code = 500;

    if (err instanceof z.ZodError) {
      message = "Invalid Input";
      body = err.issues;
      code = 422;
    }

    if (err instanceof NotFoundError) {
      message = err.message || "Resource Not Found";
      code = err.code || 404;
    }

    const errorBody = errorResponse(message, code, body);
    res.status(code).json(errorBody);
  }
}
