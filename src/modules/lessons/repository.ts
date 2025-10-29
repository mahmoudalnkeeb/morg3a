import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { CreateLessonDTO } from "./dtos/create-lesson.dto";
import { LessonDTO } from "./dtos/lesson.dto";
import { eq } from "drizzle-orm";
import { lessons } from "@/db/schema";
import { UpdateLessonDTO } from "./dtos/update-lesson.dto";

export function createLessonsRepository(db: NodePgDatabase) {
  async function getLessons(page = 1, limit = 10): Promise<LessonDTO[]> {
    const result: LessonDTO[] = await db
      .select()
      .from(lessons)
      .limit(limit)
      .offset((page - 1) * limit)
      .execute();

    return result;
  }

  async function getLesson(id: number): Promise<LessonDTO | null> {
    const lesson: LessonDTO[] = await db
      .select()
      .from(lessons)
      .where(eq(lessons.id, id))
      .execute();

    return lesson[0] || null;
  }

  async function createLesson(data: CreateLessonDTO): Promise<LessonDTO> {
    const lesson: LessonDTO[] = await db
      .insert(lessons)
      .values(data)
      .returning();

    return lesson[0];
  }

  async function updateLesson(
    id: number,
    data: UpdateLessonDTO,
  ): Promise<LessonDTO> {
    const lesson: LessonDTO[] = await db
      .update(lessons)
      .set(data)
      .where(eq(lessons.id, id))
      .returning();

    return lesson[0];
  }

  async function deleteLesson(id: number): Promise<LessonDTO> {
    const lesson: LessonDTO[] = await db
      .delete(lessons)
      .where(eq(lessons.id, id))
      .returning();

    return lesson[0];
  }

  return {
    getLessons,
    getLesson,
    createLesson,
    updateLesson,
    deleteLesson,
  };
}
