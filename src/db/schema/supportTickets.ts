import { pgTable, serial, text, varchar, timestamp, integer } from 'drizzle-orm/pg-core';
import { ticketCategoryEnum, ticketStatusEnum } from './enums';
import { staff } from './staff';
import { students } from './students';

export const supportTickets = pgTable('support_tickets', {
  id: serial('id').primaryKey(),
  studentId: integer('student_id')
    .references(() => students.id, { onDelete: 'cascade' })
    .notNull(),
  category: ticketCategoryEnum('category').notNull(),
  content: text('content').notNull(),
  imagePath: varchar('image_path', { length: 300 }),
  status: ticketStatusEnum('status').default('open'),
  assignedTo: integer('assigned_to').references(() => staff.id, {
    onDelete: 'set null',
  }),
  resolvedAt: timestamp('resolved_at'),
  resolvedBy: integer('resolved_by').references(() => staff.id, {
    onDelete: 'set null',
  }),
  createdAt: timestamp('created_at').defaultNow(),
});
