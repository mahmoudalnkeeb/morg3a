import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";
import { staffRoleEnum } from "./enums";

export const staff = pgTable("staff", {
  id: uuid("id").defaultRandom().primaryKey(),
  fullName: varchar("full_name", { length: 150 }).notNull(),
  email: varchar("email", { length: 150 }).notNull(),
  phoneNumber: varchar("phone_number", { length: 50 }),
  role: staffRoleEnum("role").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
