import { pgTable, varchar, timestamp, serial, integer } from 'drizzle-orm/pg-core';

import { grades } from './grades';

export const students = pgTable('students', {
  id: serial('id').primaryKey(),
  fullName: varchar('full_name', { length: 150 }).notNull(),
  email: varchar('email', { length: 150 }).notNull(),
  studentNumber: varchar('student_number', { length: 50 }).notNull(),
  parentNumber: varchar('parent_number', { length: 50 }).notNull(),
  country: varchar('country', { length: 100 }).default('Egypt').notNull(),
  city: varchar('city', { length: 100 }).notNull(),
  gradeId: integer('grade_id').references(() => grades.id, {
    onDelete: 'set null',
  }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
