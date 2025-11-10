import {
  pgTable,
  varchar,
  timestamp,
  serial,
  integer,
  boolean,
} from 'drizzle-orm/pg-core';
import { grades } from './grades';
import { staff } from './staff';

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
  isActive: boolean('is_active').default(true).notNull(),
  deactivatedAt: timestamp('deactivated_at'),
  deactivatedBy: integer('deactivated_by').references(() => staff.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
