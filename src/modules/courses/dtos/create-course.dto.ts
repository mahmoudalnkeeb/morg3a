import type z from 'zod';

import { CourseDTO } from './course.dto';

export const CreateCourseDTO = CourseDTO.omit({
  id: true,
  createdAt: true,
});

export type CreateCourseDTO = z.infer<typeof CreateCourseDTO>;
