import z from "zod";
import { StudentDTO } from "./student.dto";

export const CreateStudentDto = StudentDTO.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateStudentDto = z.infer<typeof CreateStudentDto>;
