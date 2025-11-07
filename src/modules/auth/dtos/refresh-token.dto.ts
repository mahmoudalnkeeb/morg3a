import { createSelectSchema } from 'drizzle-zod';
import type z from 'zod';

import { refreshTokens } from '@/db/schema/refreshTokens';

export const RefreshTokenDTO = createSelectSchema(refreshTokens);
export type RefreshTokenDTO = z.infer<typeof RefreshTokenDTO>;
