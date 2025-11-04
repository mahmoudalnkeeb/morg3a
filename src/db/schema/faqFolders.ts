import { pgTable, serial, varchar, integer } from 'drizzle-orm/pg-core';

export const faqFolders = pgTable('faq_folders', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 200 }).notNull(),
  order: integer('order').default(0),
});
