import { createSelectSchema } from 'drizzle-zod';
import type z from 'zod';

import { courses } from '@/db/schema';

export const CourseDTO = createSelectSchema(courses);

export type CourseDTO = z.infer<typeof CourseDTO>;
