import z from "zod";
import { SupportTicketDTO } from "./support-ticket.dto";

export const CreateSupportTicketDTO = SupportTicketDTO.omit({
  id: true,
  createdAt: true,
});

export type CreateSupportTicketDTO = z.infer<typeof CreateSupportTicketDTO>;
