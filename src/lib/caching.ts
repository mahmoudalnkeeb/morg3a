import { MINUTE_IN_SECONDS } from "@/config/constants";
import { getRedis } from "@/config/redis";

interface OtpOptions {
  ttlSeconds?: number;
}

interface RefreshOptions {
  ttlSeconds?: number;
}

const DEFAULT_OTP_TTL = 5 * MINUTE_IN_SECONDS;

export async function setOtp(
  phone: string,
  otp: string,
  options: OtpOptions = {},
): Promise<void> {
  const redis = await getRedis();

  const { ttlSeconds = DEFAULT_OTP_TTL } = options;
  await redis.set(`otp:${phone}`, otp, { EX: ttlSeconds });
}

export async function getOtp(phone: string): Promise<string | null> {
  const redis = await getRedis();
  return redis.get(`otp:${phone}`);
}

export async function verifyOtp(phone: string, otp: string): Promise<boolean> {
  const redis = await getRedis();
  const key = `otp:${phone}`;
  const stored = await redis.get(key);
  const valid = stored === otp;
  if (valid) await redis.del(key);
  return valid;
}
