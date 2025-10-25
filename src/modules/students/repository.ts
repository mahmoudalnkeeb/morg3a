import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { CreateStudentDTO } from "./dtos/create-student.dto";
import { StudentDTO, StudentInfo } from "./dtos/student.dto";
import { eq } from "drizzle-orm";
import { grades, students } from "@/db/schema";
import { UpdateStudentDTO } from "./dtos/update-student.dto";

export function createStudentsRepository(db: NodePgDatabase) {
  async function getStudents(page = 1, limit = 10): Promise<StudentDTO[]> {
    const result: StudentDTO[] = await db
      .select()
      .from(students)
      .limit(limit)
      .offset((page - 1) * limit)
      .execute();

    return result;
  }

  async function getStudent(id: number): Promise<StudentInfo | null> {
    const row = await db
      .select()
      .from(students)
      .leftJoin(grades, eq(students.gradeId, grades.id))
      .where(eq(students.id, id))
      .limit(1)
      .then((results) => results[0]);

    if (!row) return null;

    return {
      ...row.students,
      grade: row.grades,
    };
  }

  async function createStudent(data: CreateStudentDTO): Promise<StudentDTO> {
    const student: StudentDTO[] = await db
      .insert(students)
      .values(data)
      .returning();

    return student[0];
  }

  async function updateStudent(
    id: number,
    data: UpdateStudentDTO,
  ): Promise<StudentDTO> {
    const student: StudentDTO[] = await db
      .update(students)
      .set(data)
      .where(eq(students.id, id))
      .returning();

    return student[0];
  }

  async function deleteStudent(id: number): Promise<StudentDTO> {
    const student: StudentDTO[] = await db
      .delete(students)
      .where(eq(students.id, id))
      .returning();

    return student[0];
  }

  return {
    getStudent,
    getStudents,
    createStudent,
    updateStudent,
    deleteStudent,
  };
}
