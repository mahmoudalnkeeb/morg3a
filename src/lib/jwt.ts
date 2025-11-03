import jwt from "jsonwebtoken";
import { config } from "@/config";

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

export function verifyAccessToken(token: string) {
  return jwt.verify(token, config.jwt.accessTokenSecret);
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, config.jwt.refreshTokenSecret);
}
