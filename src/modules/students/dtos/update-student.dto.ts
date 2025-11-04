import type z from 'zod';

import { CreateStudentDTO } from './create-student.dto';

export const UpdateStudentDTO = CreateStudentDTO.partial().refine(
  (data) => Object.keys(data).length > 0,
  {
    message: 'At least one field must be provided',
  },
);

export type UpdateStudentDTO = z.infer<typeof UpdateStudentDTO>;
