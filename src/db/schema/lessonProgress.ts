import {
  pgTable,
  serial,
  integer,
  boolean,
  timestamp,
  unique,
  index,
} from 'drizzle-orm/pg-core';
import { lessons } from './lessons';
import { students } from './students';

export const lessonProgress = pgTable(
  'lesson_progress',
  {
    id: serial('id').primaryKey(),
    studentId: integer('student_id')
      .notNull()
      .references(() => students.id, {
        onDelete: 'cascade',
      }),
    lessonId: integer('lesson_id')
      .notNull()
      .references(() => lessons.id, {
        onDelete: 'cascade',
      }),
    completed: boolean('completed').default(false),
    completedAt: timestamp('completed_at'),
    lastAccessedAt: timestamp('last_accessed_at').defaultNow(),
  },
  (table) => [
    unique('lesson_progress_unique').on(table.studentId, table.lessonId),
    index('idx_lesson_progress_student').on(table.studentId),
    index('idx_lesson_progress_lesson').on(table.lessonId),
  ],
);
