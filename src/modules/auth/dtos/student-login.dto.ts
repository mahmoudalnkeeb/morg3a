import { z } from 'zod';

export const StudentLoginDto = z.object({
  phone: z.string().min(10).max(15),
});

export type StudentLoginDtoType = z.infer<typeof StudentLoginDto>;
