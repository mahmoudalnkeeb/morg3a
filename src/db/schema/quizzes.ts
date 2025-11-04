import { pgTable, serial, integer, varchar, jsonb } from 'drizzle-orm/pg-core';

import { lessons } from './lessons';

export const quizzes = pgTable('quizzes', {
  id: serial('id').primaryKey(),
  lessonId: integer('lesson_id')
    .references(() => lessons.id, { onDelete: 'cascade' })
    .notNull(),
  title: varchar('title', { length: 200 }).notNull(),
  questions: jsonb('questions').default([]),
});
