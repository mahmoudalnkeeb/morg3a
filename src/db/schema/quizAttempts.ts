import {
  pgTable,
  serial,
  integer,
  jsonb,
  decimal,
  timestamp,
  index,
} from 'drizzle-orm/pg-core';
import { quizzes } from './quizzes';
import { students } from './students';

export const quizAttempts = pgTable(
  'quiz_attempts',
  {
    id: serial('id').primaryKey(),
    studentId: integer('student_id')
      .notNull()
      .references(() => students.id, {
        onDelete: 'cascade',
      }),
    quizId: integer('quiz_id')
      .notNull()
      .references(() => quizzes.id, {
        onDelete: 'cascade',
      }),
    answers: jsonb('answers').notNull(),
    score: decimal('score', { precision: 5, scale: 2 }),
    maxScore: decimal('max_score', { precision: 5, scale: 2 }),
    percentage: decimal('percentage', { precision: 5, scale: 2 }),
    submittedAt: timestamp('submitted_at').defaultNow().notNull(),
  },
  (table) => [
    index('idx_quiz_attempts_student').on(table.studentId),
    index('idx_quiz_attempts_quiz').on(table.quizId),
  ],
);
