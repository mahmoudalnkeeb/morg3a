import "dotenv/config";
import { parseCorsOrigin } from "../utils/string";

export const environment = process.env.NODE_ENV || "development";

export const config = {
  app: {
    port: process.env.PORT || 3000,
  },
  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  corsOptions: {
    origin: parseCorsOrigin(process.env.CORS_ORIGIN || "*"),
    credentials: environment === "production",
  },
};
