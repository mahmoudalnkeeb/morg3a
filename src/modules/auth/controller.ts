import type { Request, Response } from 'express';

import { StaffLoginDto } from './dtos/staff-login.dto';
import { StudentLoginDto } from './dtos/student-login.dto';
import * as authService from './service';

import { failResponse, successResponse } from '@/utils/messages';

export async function sendStudentOTP(req: Request, res: Response) {
  const data = await StudentLoginDto.parseAsync(req.body);
  const sent = await authService.sendStudentOTP(data);
  if (!sent) return res.status(404).json(failResponse({ phone: 'student not found' }));
  res.json(successResponse({ message: 'OTP sent successfully' }));
}

export async function verifyStudentOTP(req: Request, res: Response) {
  const { phone, otp } = req.body as { phone: string; otp: string };
  if (!phone || !otp)
    return res.status(400).json(failResponse({ message: 'phone and otp are required' }));

  const tokens = await authService.verifyStudentOTP(phone, otp);
  if (!tokens)
    return res.status(400).json(failResponse({ message: 'invalid or expired OTP' }));

  res.json(successResponse(tokens));
}

export async function staffLogin(req: Request, res: Response) {
  const data = await StaffLoginDto.parseAsync(req.body);
  const tokens = await authService.staffLogin(data);

  if (!tokens)
    return res.status(401).json(failResponse({ message: 'invalid credentials' }));

  res.json(successResponse(tokens));
}

export async function refreshToken(req: Request, res: Response) {
  const { refreshToken: token } = req.body as { refreshToken: string };
  if (!token)
    return res.status(400).json(failResponse({ refreshToken: 'token is required' }));

  const tokens = await authService.refreshToken(token);
  if (!tokens)
    return res.status(401).json(failResponse({ message: 'invalid or expired token' }));

  res.json(successResponse(tokens));
}

export async function logout(req: Request, res: Response) {
  // NOTE: this can make any user revoke another user token
  const { userId, refreshToken: token } = req.body as {
    userId: number;
    refreshToken: string;
  };

  if (!userId || !token)
    return res
      .status(400)
      .json(failResponse({ message: 'userId and token are required' }));

  await authService.logout(userId, token);
  res.json(successResponse({ message: 'Logged out successfully' }));
}
