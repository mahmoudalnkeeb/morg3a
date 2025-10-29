import z from "zod";
import { CreateStaffDTO } from "./create-staff.dto";

export const UpdateStaffDTO = CreateStaffDTO.partial().refine(
  (data) => Object.keys(data).length > 0,
  {
    message: "At least one field must be provided",
  },
);

export type UpdateStaffDTO = z.infer<typeof UpdateStaffDTO>;
