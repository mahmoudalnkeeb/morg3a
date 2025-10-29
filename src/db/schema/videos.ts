import {
  pgTable,
  serial,
  varchar,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import { lessons } from "./lessons";

export const videos = pgTable("videos", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id")
    .references(() => lessons.id, { onDelete: "cascade" })
    .notNull(),
  storagePath: varchar("storage_path", { length: 300 }).notNull(),
  duration: integer("duration"),
  isPrivate: boolean("is_private").default(true),
  views: integer("views").default(0),
});
