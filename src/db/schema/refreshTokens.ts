import {
  pgTable,
  serial,
  integer,
  varchar,
  timestamp,
  text,
} from "drizzle-orm/pg-core";
import { userTypeEnum } from "./enums";

export const refreshTokens = pgTable("refresh_tokens", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  userType: userTypeEnum("user_type").notNull(),
  token: varchar("token", { length: 500 }).notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
