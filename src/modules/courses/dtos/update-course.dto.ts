import type z from 'zod';

import { CreateCourseDTO } from './create-course.dto';

export const UpdateCourseDTO = CreateCourseDTO.partial().refine(
  (data) => Object.keys(data).length > 0,
  {
    message: 'At least one field must be provided',
  },
);

export type UpdateCourseDTO = z.infer<typeof UpdateCourseDTO>;
