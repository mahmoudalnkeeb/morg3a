import { parseCorsOrigin } from "@/utils/strings";
import { z } from "zod";
import { logger } from "./logger";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.string().optional(),
  BASE_URL: z.string().url().optional(),
  PLATFORM_NAME: z.string(),

  ACCESS_TOKEN_SECRET: z.string().min(1),
  REFRESH_TOKEN_SECRET: z.string().min(1),

  DB_HOST: z.string(),
  DB_PORT: z.string().default("5432"),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),

  CORS_ORIGIN: z.string().default("*"),

  N_CLIENT_ID: z.string(),
  N_CLIENT_SECRET: z.string(),
  N_BASE_URL: z.string().url(),
  N_OTP_TEMPLATE_ID: z.string(),

  S3_ENDPOINT: z.string().url(),
  S3_REGION: z.string(),
  S3_ACCESS_KEY: z.string(),
  S3_SECRET_KEY: z.string(),
  S3_PUBLIC_ENDPOINT: z.string().optional(),
  S3_BUCKET: z.string(),

  REDIS_URL: z.string().url(),
});

let validatedEnv: z.infer<typeof envSchema>;

try {
  validatedEnv = envSchema.parse(process.env);
} catch (err) {
  if (err instanceof z.ZodError) {
    const formattedErrors = err.issues.map((e) => {
      const path = e.path.join(".");
      return `- ${path}: ${e.message}`;
    });

    logger.error(
      [
        "❌ Invalid environment configuration detected:",
        ...formattedErrors,
        "",
        "💡 Fix the above environment variables and restart the server.",
      ].join("\n"),
    );

    process.exit(1);
  }

  logger.error("Unexpected error during environment validation", {
    error: err,
  });
  process.exit(1);
}

export const environment = validatedEnv.NODE_ENV;

export const config = {
  app: {
    port: Number(validatedEnv.PORT) || 3000,
    baseURL: validatedEnv.BASE_URL,
    platformName: validatedEnv.PLATFORM_NAME,
  },
  jwt: {
    accessTokenSecret: validatedEnv.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: validatedEnv.REFRESH_TOKEN_SECRET,
    accessTokenExpiresIn: "15m",
    refreshTokenExpiresIn: "7d",
  },
  database: {
    host: validatedEnv.DB_HOST,
    port: parseInt(validatedEnv.DB_PORT, 10),
    user: validatedEnv.DB_USER,
    password: validatedEnv.DB_PASSWORD,
    database: validatedEnv.DB_NAME,
    ssl: environment === "production",
  },
  corsOptions: {
    origin: parseCorsOrigin(validatedEnv.CORS_ORIGIN),
    credentials: environment === "production",
  },
  notification: {
    clientId: validatedEnv.N_CLIENT_ID,
    clientSecret: validatedEnv.N_CLIENT_SECRET,
    baseURL: validatedEnv.N_BASE_URL,
    loginTemplateId: validatedEnv.N_OTP_TEMPLATE_ID,
  },
  s3: {
    config: {
      endpoint: validatedEnv.S3_ENDPOINT,
      region: validatedEnv.S3_REGION,
      credentials: {
        accessKeyId: validatedEnv.S3_ACCESS_KEY,
        secretAccessKey: validatedEnv.S3_SECRET_KEY,
      },
    },
    publicEndpoint: validatedEnv.S3_PUBLIC_ENDPOINT || "http://localhost:9000",
    bucket: validatedEnv.S3_BUCKET,
  },
  redis: {
    url: validatedEnv.REDIS_URL,
  },
} as const;

export type AppConfig = typeof config;
