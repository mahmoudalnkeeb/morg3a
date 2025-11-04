import type z from 'zod';

import { FaqFolderDTO } from './faq-folder.dto';

export const CreateFaqFolderDTO = FaqFolderDTO.omit({
  id: true,
});

export type CreateFaqFolderDTO = z.infer<typeof CreateFaqFolderDTO>;
