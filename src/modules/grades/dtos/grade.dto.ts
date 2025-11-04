import { createSelectSchema } from 'drizzle-zod';
import type z from 'zod';

import { grades } from '@/db/schema';

export const GradeDTO = createSelectSchema(grades);
export type GradeDTO = z.infer<typeof GradeDTO>;
