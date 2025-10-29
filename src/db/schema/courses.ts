import {
  pgTable,
  varchar,
  serial,
  text,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { staff } from "./staff";
import { grades } from "./grades";

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description"),
  teacherId: integer("teacher_id")
    .references(() => staff.id, { onDelete: "cascade" })
    .notNull(),
  gradeId: integer("grade_id").references(() => grades.id, {
    onDelete: "set null",
  }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});
