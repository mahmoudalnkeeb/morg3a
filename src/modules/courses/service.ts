import type { CreateCourseDTO } from './dtos/create-course.dto';
import { type UpdateCourseDTO } from './dtos/update-course.dto';
import { createCoursesRepository } from './repository';

import { db } from '@/db';
import { NotFoundError } from '@/utils/errors';

const coursesRepo = createCoursesRepository(db);

export async function getCourses(page = 1, limit = 10) {
  return coursesRepo.getCourses(page, limit);
}

export async function getCourse(id: number) {
  const course = await coursesRepo.getCourse(id);
  if (!course) throw new NotFoundError('Course not found');
  return course;
}

export async function createCourse(data: CreateCourseDTO) {
  const newCourse = await coursesRepo.createCourse(data);
  return newCourse;
}

export async function updateCourse(id: number, data: UpdateCourseDTO) {
  const existing = await coursesRepo.getCourse(id);
  if (!existing) throw new NotFoundError('Course not found');

  const updated = await coursesRepo.updateCourse(id, data);
  return updated;
}

export async function deleteCourse(id: number) {
  const existing = await coursesRepo.getCourse(id);
  if (!existing) throw new NotFoundError('Course not found');

  const deleted = await coursesRepo.deleteCourse(id);
  return deleted;
}
