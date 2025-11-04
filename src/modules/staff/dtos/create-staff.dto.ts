import type z from 'zod';

import { StaffDTO } from './staff.dto';

export const CreateStaffDTO = StaffDTO.omit({
  id: true,
  createdAt: true,
});

export type CreateStaffDTO = z.infer<typeof CreateStaffDTO>;
