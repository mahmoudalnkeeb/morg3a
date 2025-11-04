import { pgTable, serial, varchar, integer, timestamp } from 'drizzle-orm/pg-core';

import { courses } from './courses';

export const lessons = pgTable('lessons', {
  id: serial('id').primaryKey(),
  courseId: integer('course_id')
    .references(() => courses.id, { onDelete: 'cascade' })
    .notNull(),
  title: varchar('title', { length: 200 }).notNull(),
  order: integer('order').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});
