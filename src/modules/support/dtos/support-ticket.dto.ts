import { createSelectSchema } from 'drizzle-zod';
import type z from 'zod';

import { supportTickets } from '@/db/schema';

export const SupportTicketDTO = createSelectSchema(supportTickets);

export type SupportTicketDTO = z.infer<typeof SupportTicketDTO>;
