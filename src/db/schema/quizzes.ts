import { pgTable, uuid, varchar, jsonb } from "drizzle-orm/pg-core";
import { lessons } from "./lessons";

export const quizzes = pgTable("quizzes", {
  id: uuid("id").defaultRandom().primaryKey(),
  lessonId: uuid("lesson_id")
    .references(() => lessons.id, { onDelete: "cascade" })
    .notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  questions: jsonb("questions").default([]),
});
