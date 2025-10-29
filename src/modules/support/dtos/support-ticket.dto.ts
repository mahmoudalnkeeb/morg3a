import { supportTickets } from "@/db/schema";
import { createSelectSchema } from "drizzle-zod";
import z from "zod";

export const SupportTicketDTO = createSelectSchema(supportTickets);

export type SupportTicketDTO = z.infer<typeof SupportTicketDTO>;
