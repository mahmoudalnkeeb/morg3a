import {
  pgTable,
  varchar,
  timestamp,
  serial,
  integer,
} from "drizzle-orm/pg-core";
import { grades } from "./grades";

export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 150 }).notNull(),
  email: varchar("email", { length: 150 }).notNull(),
  studentNumber: varchar("student_number", { length: 50 }),
  parentNumber: varchar("parent_number", { length: 50 }),
  country: varchar("country", { length: 100 }).default("Egypt"),
  city: varchar("city", { length: 100 }),
  gradeId: integer("grade_id").references(() => grades.id, {
    onDelete: "set null",
  }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
