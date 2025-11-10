import { integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

import { documentMimeTypeEnum, documentTypeEnum } from './enums';
import { lessons } from './lessons';

export const documents = pgTable('documents', {
  id: serial('id').primaryKey(),
  lessonId: integer('lesson_id').references(() => lessons.id, {
    onDelete: 'cascade',
  }),
  type: documentTypeEnum('type').notNull(),
  mimeType: documentMimeTypeEnum('mime_type').notNull(),
  title: varchar('title', { length: 200 }),
  storagePath: varchar('storage_path', { length: 300 }).notNull(),
});
