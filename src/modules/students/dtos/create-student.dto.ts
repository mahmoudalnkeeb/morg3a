import type z from 'zod';

import { StudentDTO } from './student.dto';

export const CreateStudentDTO = StudentDTO.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateStudentDTO = z.infer<typeof CreateStudentDTO>;
