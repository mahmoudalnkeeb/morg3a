import type z from 'zod';

import { FaqQuestionDTO } from './faq-question.dto';

export const CreateFaqQuestionDTO = FaqQuestionDTO.omit({
  id: true,
});

export type CreateFaqQuestionDTO = z.infer<typeof CreateFaqQuestionDTO>;
