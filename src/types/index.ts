import type { Request } from 'express';
import type { userTypeEnum } from '@/db/schema';

export type UserType = (typeof userTypeEnum.enumValues)[number];
export type Role = 'student' | 'teacher' | 'support_agent' | 'admin';
export type UserPayload = { userId: string; role: Role };
export interface UserRequest extends Request {
  user: UserPayload;
}
