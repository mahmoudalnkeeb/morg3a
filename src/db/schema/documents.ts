import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { documentTypeEnum } from "./enums";
import { lessons } from "./lessons";

export const documents = pgTable("documents", {
  id: uuid("id").defaultRandom().primaryKey(),
  lessonId: uuid("lesson_id")
    .references(() => lessons.id, { onDelete: "cascade" })
    .notNull(),
  type: documentTypeEnum("type").notNull(),
  title: varchar("title", { length: 200 }),
  storagePath: varchar("storage_path", { length: 300 }).notNull(),
});
