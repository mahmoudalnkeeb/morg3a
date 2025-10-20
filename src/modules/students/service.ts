import { students } from "../../db/schema/index.ts";
import { db } from "../../db";
import { CreateStudentDto } from "./dtos/create-student.dto";
import { StudentDTO } from "./dtos/student.dto.ts";

export async function createStudent(
  data: CreateStudentDto,
): Promise<StudentDTO | undefined> {
  const student: StudentDTO[] = await db
    .insert(students)
    .values(data)
    .returning();

  return student[0];
}
