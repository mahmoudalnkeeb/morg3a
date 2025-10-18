import { pgTable, uuid, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { ticketCategoryEnum, ticketStatusEnum } from "./enums";
import { students } from "./students";

export const supportTickets = pgTable("support_tickets", {
  id: uuid("id").defaultRandom().primaryKey(),
  studentId: uuid("student_id")
    .references(() => students.id, { onDelete: "cascade" })
    .notNull(),
  category: ticketCategoryEnum("category").notNull(),
  content: text("content").notNull(),
  imagePath: varchar("image_path", { length: 300 }),
  status: ticketStatusEnum("status").default("open"),
  createdAt: timestamp("created_at").defaultNow(),
});
