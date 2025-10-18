import { pgTable, uuid, varchar, integer } from "drizzle-orm/pg-core";

export const faqFolders = pgTable("faq_folders", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  order: integer("order").default(0),
});
