import { createSelectSchema } from 'drizzle-zod';
import type z from 'zod';

import { students } from '@/db/schema';
import { type GradeDTO } from '@/modules/grades/dtos/grade.dto';

export const StudentDTO = createSelectSchema(students);

export type StudentDTO = z.infer<typeof StudentDTO>;

export type StudentInfo = StudentDTO & {
  grade: GradeDTO | null;
};
