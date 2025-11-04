import { createSelectSchema } from 'drizzle-zod';
import type z from 'zod';

import { lessons } from '@/db/schema';

export const LessonDTO = createSelectSchema(lessons);

export type LessonDTO = z.infer<typeof LessonDTO>;
