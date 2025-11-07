import type { Role } from './dtos/refresh-token.dto';
import type { StaffLoginDtoType } from './dtos/staff-login.dto';
import type { StudentLoginDtoType } from './dtos/student-login.dto';
import { createAuthRepository } from './repository';
import { constants, logger } from '@/config';
import { db } from '@/db';

import { setOtp, verifyOtp } from '@/lib/caching';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '@/lib/jwt';
import { generateOtp } from '@/utils/otp';

const authRepository = createAuthRepository(db);

export async function sendStudentOTP({ phone }: StudentLoginDtoType) {
  const student = await authRepository.findStudentByPhoneNumber(phone);
  if (!student) return false;

  const otp = generateOtp({ length: 6, type: 'numeric' });
  await setOtp(phone, otp);

  // TODO: integrate with notifcation api templates
  logger.info(`OTP for ${phone}: ${otp}`);

  return true;
}

export async function verifyStudentOTP(studentPhone: string, otp: string) {
  const valid = await verifyOtp(studentPhone, otp);
  if (!valid) return null;

  const student = await authRepository.findStudentByPhoneNumber(studentPhone);
  if (!student) return null;

  const accessToken = generateAccessToken({ userId: student.id, role: 'student' });
  const refreshToken = generateRefreshToken({ userId: student.id, role: 'student' });

  await authRepository.createRefreshToken({
    userId: student.id,
    userType: 'student',
    token: refreshToken,
    expiresAt: constants.REFRESH_TOKEN_TTL,
  });

  return { accessToken, refreshToken };
}

export async function staffLogin({ identifier, password }: StaffLoginDtoType) {
  const staff = await authRepository.verifyStaffPassword(identifier, password);
  if (!staff) return null;

  const accessToken = generateAccessToken({ userId: staff.id, role: 'staff' });
  const refreshToken = generateRefreshToken({ userId: staff.id, role: 'staff' });

  await authRepository.createRefreshToken({
    userId: staff.id,
    userType: 'staff',
    token: refreshToken,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  });

  return { accessToken, refreshToken };
}

export async function refreshToken(token: string) {
  const payload = verifyRefreshToken(token) as { userId: number; role: Role };
  if (!payload) return null;

  const existing = await authRepository.validateRefreshToken(token);
  if (!existing) return null;

  const newAccessToken = generateAccessToken({
    userId: payload.userId,
    role: payload.role,
  });
  const newRefreshToken = generateRefreshToken({
    userId: payload.userId,
    role: payload.role,
  });

  await authRepository.revokeRefreshToken(token);
  await authRepository.createRefreshToken({
    userId: payload.userId,
    userType: payload.role == 'student' ? 'student' : 'staff',
    token: newRefreshToken,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  });

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
}

export async function logout(userId: number, token: string) {
  await authRepository.revokeRefreshToken(token);
  return true;
}
