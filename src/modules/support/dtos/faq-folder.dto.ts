import { createSelectSchema } from 'drizzle-zod';
import type z from 'zod';

import { faqFolders } from '@/db/schema';

export const FaqFolderDTO = createSelectSchema(faqFolders);

export type FaqFolderDTO = z.infer<typeof FaqFolderDTO>;
