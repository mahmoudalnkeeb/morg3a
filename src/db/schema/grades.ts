import {
  pgTable,
  serial,
  varchar,
  smallint,
  boolean,
  timestamp,
  unique,
} from 'drizzle-orm/pg-core';

export const grades = pgTable(
  'grades',
  {
    id: serial('id').primaryKey(),
    year: smallint('year').notNull(),
    specialization: varchar('specialization', { length: 100 }).notNull(),
    academicYear: varchar('academic_year', { length: 9 }).notNull(),
    isActive: boolean('is_active').default(true),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (table) => [
    unique('grades_unique').on(table.year, table.specialization, table.academicYear),
  ],
);
