import type { NextFunction, Request, Response } from 'express';
import { verifyAccessToken } from '@/lib/jwt';
import type { UserRequest } from '@/types';

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const decoded = verifyAccessToken(token);
    (req as UserRequest).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
}
