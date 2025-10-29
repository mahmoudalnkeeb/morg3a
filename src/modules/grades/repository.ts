import { grades } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { GradeDTO } from "./dtos/grade.dto";
import { CreateGradeDTO } from "./dtos/create-grade.dto";
import { UpdateGradeDTO } from "./dtos/update-grade.dto";

export function createGradesRepository(db: NodePgDatabase) {
  async function getGrades(page = 1, limit = 10): Promise<GradeDTO[] | []> {
    const result: GradeDTO[] = await db
      .select()
      .from(grades)
      .limit(limit)
      .offset((page - 1) * limit)
      .execute();

    return result;
  }

  async function getGrade(id: number): Promise<GradeDTO> {
    const grade: GradeDTO[] = await db
      .select()
      .from(grades)
      .where(eq(grades.id, id))
      .execute();

    return grade[0];
  }

  async function createGrade(data: CreateGradeDTO): Promise<GradeDTO> {
    const grade: GradeDTO[] = await db.insert(grades).values(data).returning();

    return grade[0];
  }

  async function updateGrade(
    id: number,
    data: UpdateGradeDTO,
  ): Promise<GradeDTO> {
    const grade: GradeDTO[] = await db
      .update(grades)
      .set(data)
      .where(eq(grades.id, id))
      .returning();

    return grade[0];
  }

  async function deleteGrade(id: number): Promise<GradeDTO> {
    const grade: GradeDTO[] = await db
      .delete(grades)
      .where(eq(grades.id, id))
      .returning();

    return grade[0];
  }

  return { getGrades, getGrade, createGrade, updateGrade, deleteGrade };
}
