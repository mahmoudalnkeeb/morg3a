import { pgTable, serial, integer, text, timestamp, index } from 'drizzle-orm/pg-core';
import { userTypeEnum } from './enums';
import { supportTickets } from './supportTickets';

export const ticketMessages = pgTable(
  'ticket_messages',
  {
    id: serial('id').primaryKey(),
    ticketId: integer('ticket_id')
      .notNull()
      .references(() => supportTickets.id, {
        onDelete: 'cascade',
      }),
    senderType: userTypeEnum('sender_type').notNull(),
    senderId: integer('sender_id').notNull(),
    message: text('message').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [index('idx_ticket_messages_ticket').on(table.ticketId, table.createdAt)],
);
