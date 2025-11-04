import type { Request, Response, NextFunction } from 'express';
import z from 'zod';

import { logger } from '@/config';
import { NotFoundError } from '@/utils/errors';
import { errorResponse } from '@/utils/messages';

export default function errorHandler(
  err: Error | NotFoundError | z.ZodError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err) {
    logger.error(err);
    console.error(err);

    let message = err.message || 'Internal Server Error';
    let body = {};
    let code = 500;

    if (err instanceof z.ZodError) {
      message = 'Invalid Input';
      body = err.issues;
      code = 422;
    }

    if (err instanceof NotFoundError) {
      message = err.message || 'Resource Not Found';
      code = err.code || 404;
    }

    const errorBody = errorResponse(message, code, body);
    res.status(code).json(errorBody);
  }
}
