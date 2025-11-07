import jwt from 'jsonwebtoken';

import { config } from '@/config';
import type { UserPayload } from '@/types';

export function generateAccessToken(payload: object) {
  return jwt.sign(payload, config.jwt.accessTokenSecret, {
    expiresIn: config.jwt.accessTokenExpiresIn,
  });
}

export function generateRefreshToken(payload: object) {
  return jwt.sign(payload, config.jwt.refreshTokenSecret, {
    expiresIn: config.jwt.refreshTokenExpiresIn,
  });
}

export function verifyAccessToken(token: string): UserPayload {
  return jwt.verify(token, config.jwt.accessTokenSecret) as UserPayload;
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, config.jwt.refreshTokenSecret);
}
