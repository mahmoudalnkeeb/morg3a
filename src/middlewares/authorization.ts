import type { NextFunction, Request, Response } from 'express';
import type { Role, UserRequest } from '@/types';
import { errorResponse } from '@/utils/messages';

export function authorize(role: Role[]) {
  return function (req: Request, res: Response, next: NextFunction) {
    // check req.user.role == role
    const authorized = role.includes((req as UserRequest).user.role);

    if (!authorized) {
      res.status(403).json(errorResponse('you are not authorized to do this!', 403));
      return;
    }

    next();
  };
}
