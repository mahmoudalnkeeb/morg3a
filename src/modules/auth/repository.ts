import bcrypt from 'bcrypt';
import { eq, or, and, gt, sql } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import type { CreateRefreshTokenDTO } from './dtos/create-refresh-token.dto';
import { refreshTokens, staff, students } from '@/db/schema';

export function createAuthRepository(db: NodePgDatabase) {
  async function findStudentByPhoneNumber(phone: string) {
    const student = await db
      .select()
      .from(students)
      .where(eq(students.studentNumber, phone))
      .limit(1);
    return student[0] || null;
  }

  async function findStaffByIdentifier(identifier: string) {
    const result = await db
      .select()
      .from(staff)
      .where(or(eq(staff.email, identifier), eq(staff.phoneNumber, identifier)))
      .limit(1);
    return result[0] || null;
  }

  async function verifyStaffPassword(identifier: string, password: string) {
    const staffMember = await findStaffByIdentifier(identifier);

    if (!staffMember) return null;

    const isValid = await bcrypt.compare(password, staffMember.password);
    if (!isValid) return null;

    return { id: staffMember.id, role: staffMember.role };
  }

  async function createRefreshToken(tokenDto: CreateRefreshTokenDTO) {
    const [createdToken] = await db.insert(refreshTokens).values(tokenDto).returning();
    return createdToken;
  }

  async function validateRefreshToken(token: string) {
    const result = await db
      .select()
      .from(refreshTokens)
      .where(and(eq(refreshTokens.token, token), gt(refreshTokens.expiresAt, sql`now()`)))
      .limit(1);
    return result[0] || null;
  }

  async function revokeRefreshToken(token: string) {
    await db.delete(refreshTokens).where(eq(refreshTokens.token, token));
  }

  async function revokeAllRefreshTokens(userId?: number) {
    if (!userId) return;
    await db.delete(refreshTokens).where(eq(refreshTokens.userId, userId));
  }

  return {
    findStudentByPhoneNumber,
    findStaffByIdentifier,
    verifyStaffPassword,
    createRefreshToken,
    validateRefreshToken,
    revokeRefreshToken,
    revokeAllRefreshTokens,
  };
}
