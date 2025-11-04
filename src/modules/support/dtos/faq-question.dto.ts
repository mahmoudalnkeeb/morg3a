import { createSelectSchema } from 'drizzle-zod';
import type z from 'zod';

import { faqQuestions } from '@/db/schema';

export const FaqQuestionDTO = createSelectSchema(faqQuestions);

export type FaqQuestionDTO = z.infer<typeof FaqQuestionDTO>;
