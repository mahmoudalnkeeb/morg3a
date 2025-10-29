import z from "zod";
import { CreateSupportTicketDTO } from "./create-support-ticket.dto";

export const UpdateSupportTicketDTO = CreateSupportTicketDTO.partial().refine(
  (data) => Object.keys(data).length > 0,
  {
    message: "At least one field must be provided",
  },
);

export type UpdateSupportTicketDTO = z.infer<typeof UpdateSupportTicketDTO>;
