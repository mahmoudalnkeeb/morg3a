import {
  pgTable,
  serial,
  varchar,
  smallint,
  boolean,
  timestamp,
} from 'drizzle-orm/pg-core';

export const grades = pgTable('grades', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  specialization: varchar('specialization', { length: 100 }).notNull(),
  year: smallint('year').notNull(),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
