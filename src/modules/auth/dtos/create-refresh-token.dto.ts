import type z from 'zod';

import { RefreshTokenDTO } from './refresh-token.dto';

export const CreateRefreshTokenDTO = RefreshTokenDTO.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateRefreshTokenDTO = z.infer<typeof CreateRefreshTokenDTO>;
