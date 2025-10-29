import { parseCorsOrigin } from "@/utils/strings";

export const environment = process.env.NODE_ENV || "development";

export const config = {
  app: {
    port: process.env.PORT || 3000,
    baseURL: process.env.BASE_URL,
    platformName: process.env.PLATFORM_NAME as string,
  },
  database: {
    host: process.env.DB_HOST as string,
    port: parseInt(process.env.DB_PORT || "5432", 10),
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
    ssl: environment === "production",
  },
  corsOptions: {
    origin: parseCorsOrigin(process.env.CORS_ORIGIN || "*"),
    credentials: environment === "production",
  },
  notification: {
    clientId: process.env.N_CLIENT_ID as string,
    clientSecret: process.env.N_CLIENT_SECRET as string,
    baseURL: process.env.N_BASE_URL as string,
    loginTemplateId: process.env.N_OTP_TEMPLATE_ID as string,
  },
  s3: {
    config: {
      endpoint: process.env.S3_ENDPOINT as string,
      region: process.env.S3_REGION as string,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY as string,
        secretAccessKey: process.env.S3_SECRET_KEY as string,
      },
    },
    bucket: process.env.S3_BUCKET as string,
  },
};
