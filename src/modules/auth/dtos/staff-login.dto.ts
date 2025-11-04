import { z } from 'zod';

export const StaffLoginDto = z.object({
  // Email or Phone Number
  identifier: z.email().or(
    z
      .string()
      .min(10)
      .max(15)
      .refine((s) => /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/.test(s)),
  ),
  password: z.string().min(8).max(100),
});

export type StaffLoginDtoType = z.infer<typeof StaffLoginDto>;
