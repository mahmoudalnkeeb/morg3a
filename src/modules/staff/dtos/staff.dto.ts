import { createSelectSchema } from 'drizzle-zod';
import type z from 'zod';

import { staff } from '@/db/schema';

export const StaffDTO = createSelectSchema(staff);

export type StaffDTO = z.infer<typeof StaffDTO>;
