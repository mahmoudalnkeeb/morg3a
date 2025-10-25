// import "dotenv/config";
import { parseCorsOrigin } from "@/utils/strings";

export const environment = process.env.NODE_ENV || "development";

export const config = {
  app: {
    port: process.env.PORT || 3000,
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
};
