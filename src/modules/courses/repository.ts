import { eq } from 'drizzle-orm';
import { type NodePgDatabase } from 'drizzle-orm/node-postgres';

import { type CourseDTO } from './dtos/course.dto';
import { type CreateCourseDTO } from './dtos/create-course.dto';
import { type UpdateCourseDTO } from './dtos/update-course.dto';

import { courses } from '@/db/schema';

export function createCoursesRepository(db: NodePgDatabase) {
  async function getCourses(page = 1, limit = 10): Promise<CourseDTO[]> {
    const result: CourseDTO[] = await db
      .select()
      .from(courses)
      .limit(limit)
      .offset((page - 1) * limit)
      .execute();

    return result;
  }

  async function getCourse(id: number): Promise<CourseDTO | null> {
    const course: CourseDTO[] = await db
      .select()
      .from(courses)
      .where(eq(courses.id, id))
      .execute();

    return course[0] || null;
  }

  async function createCourse(data: CreateCourseDTO): Promise<CourseDTO> {
    const course: CourseDTO[] = await db.insert(courses).values(data).returning();

    return course[0];
  }

  async function updateCourse(id: number, data: UpdateCourseDTO): Promise<CourseDTO> {
    const course: CourseDTO[] = await db
      .update(courses)
      .set(data)
      .where(eq(courses.id, id))
      .returning();

    return course[0];
  }

  async function deleteCourse(id: number): Promise<CourseDTO> {
    const course: CourseDTO[] = await db
      .delete(courses)
      .where(eq(courses.id, id))
      .returning();

    return course[0];
  }

  return {
    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
  };
}
