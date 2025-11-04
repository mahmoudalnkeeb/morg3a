import { createSelectSchema } from 'drizzle-zod';
import type z from 'zod';

import { quizzes } from '@/db/schema';

export const QuizDTO = createSelectSchema(quizzes);

export type QuizDTO = z.infer<typeof QuizDTO>;
