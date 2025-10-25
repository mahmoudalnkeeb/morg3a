import z from "zod";
import { GradeDTO } from "./grade.dto";

export const CreateGradeDTO = GradeDTO.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateGradeDTO = z.infer<typeof CreateGradeDTO>;
