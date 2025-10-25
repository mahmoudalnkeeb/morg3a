import z from "zod";
import { CreateGradeDTO } from "./create-grade.dto";

export const UpdateGradeDTO = CreateGradeDTO.partial().refine(
  (data) => Object.keys(data).length > 0,
  {
    message: "At least one field must be provided",
  },
);

export type UpdateGradeDTO = z.infer<typeof UpdateGradeDTO>;
