import { students } from "../../db/schema/index.ts";
import { db } from "../../db";
import { CreateStudentDto } from "./dtos/create-student.dto";

export async function createStudent(
  data: CreateStudentDto,
): Promise<number | undefined> {
  const student = await db
    .insert(students)
    .values(data)
    .returning({ id: students.id });

  return student[0]?.id;
}
