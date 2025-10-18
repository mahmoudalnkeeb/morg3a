import { config } from "../config/index.ts";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool(config.database);

export const db = drizzle({ client: pool });
