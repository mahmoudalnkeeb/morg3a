import { pgEnum } from "drizzle-orm/pg-core";

export const staffRoleEnum = pgEnum("staff_role", [
  "teacher",
  "support_agent",
  "admin",
]);
export const documentTypeEnum = pgEnum("document_type", [
  "lesson",
  "mozakra",
  "mol5as",
]);
export const ticketStatusEnum = pgEnum("ticket_status", [
  "open",
  "in_progress",
  "closed",
]);
export const ticketCategoryEnum = pgEnum("ticket_category", [
  "technical",
  "payment",
  "general",
]);
