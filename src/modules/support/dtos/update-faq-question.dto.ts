import type z from 'zod';

import { CreateFaqQuestionDTO } from './create-faq-question.dto';

export const UpdateFaqQuestionDTO = CreateFaqQuestionDTO.partial().refine(
  (data) => Object.keys(data).length > 0,
  {
    message: 'At least one field must be provided',
  },
);

export type UpdateFaqQuestionDTO = z.infer<typeof UpdateFaqQuestionDTO>;
