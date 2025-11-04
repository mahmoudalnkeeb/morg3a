import type { NextFunction, Request, Response } from 'express';

import { errorResponse } from '../utils/messages';

export default function notFound(req: Request, res: Response, _next: NextFunction) {
  const notFoundBody = errorResponse(
    `the requested resource does not exist: ${req.path}`,
  );
  res.status(404).json(notFoundBody);
}
