import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { staff } from "./staff";
import { grades } from "./grades";

export const courses = pgTable("courses", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description"),
  teacherId: uuid("teacher_id")
    .references(() => staff.id, { onDelete: "cascade" })
    .notNull(),
  gradeId: uuid("grade_id").references(() => grades.id, {
    onDelete: "set null",
  }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});
