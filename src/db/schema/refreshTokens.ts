import { pgTable, serial, integer, varchar, timestamp, index } from 'drizzle-orm/pg-core';
import { userTypeEnum } from './enums';

export const refreshTokens = pgTable(
  'refresh_tokens',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull(),
    userType: userTypeEnum('user_type').notNull(),
    token: varchar('token', { length: 500 }).notNull().unique(),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
  },
  (table) => [
    index('idx_refresh_tokens_user').on(table.userId, table.userType),
    index('idx_refresh_tokens_expires').on(table.expiresAt),
  ],
);
