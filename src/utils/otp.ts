import crypto from "crypto";

interface GenerateOtpOptions {
  length?: number;
  type?: "numeric" | "alphanumeric";
}

export function generateOtp(options: GenerateOtpOptions = {}) {
  const { length = 6, type = "numeric" } = options;

  const chars =
    type === "numeric"
      ? "0123456789"
      : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let otp = "";
  const randomBytes = crypto.randomBytes(length);

  for (let i = 0; i < length; i++) {
    otp += chars[randomBytes[i] % chars.length];
  }

  return otp;
}
