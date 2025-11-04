import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';

import { faqFolders } from './faqFolders';

export const faqQuestions = pgTable('faq_questions', {
  id: serial('id').primaryKey(),
  folderId: integer('folder_id')
    .references(() => faqFolders.id, { onDelete: 'cascade' })
    .notNull(),
  question: text('question').notNull(),
  answer: text('answer'),
  tags: text('tags').array(),
  views: integer('views').default(0),
});
