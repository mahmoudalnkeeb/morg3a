import { students } from "@/db/schema";
import { GradeDTO } from "@/modules/grades/dtos/grade.dto";
import { createSelectSchema } from "drizzle-zod";
import z from "zod";

export const StudentDTO = createSelectSchema(students);

export type StudentDTO = z.infer<typeof StudentDTO>;

export type StudentInfo = StudentDTO & {
  grade: GradeDTO | null;
};
