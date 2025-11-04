import type { CreateLessonDTO } from './dtos/create-lesson.dto';
import { type UpdateLessonDTO } from './dtos/update-lesson.dto';
import { createLessonsRepository } from './repository';

import { db } from '@/db';
import { NotFoundError } from '@/utils/errors';

const lessonsRepo = createLessonsRepository(db);

export async function getLessons(page = 1, limit = 10) {
  return lessonsRepo.getLessons(page, limit);
}

export async function getLesson(id: number) {
  const lesson = await lessonsRepo.getLesson(id);
  if (!lesson) throw new NotFoundError('Lesson not found');
  return lesson;
}

export async function createLesson(data: CreateLessonDTO) {
  const newLesson = await lessonsRepo.createLesson(data);
  return newLesson;
}

export async function updateLesson(id: number, data: UpdateLessonDTO) {
  const existing = await lessonsRepo.getLesson(id);
  if (!existing) throw new NotFoundError('Lesson not found');

  const updated = await lessonsRepo.updateLesson(id, data);
  return updated;
}

export async function deleteLesson(id: number) {
  const existing = await lessonsRepo.getLesson(id);
  if (!existing) throw new NotFoundError('Lesson not found');

  const deleted = await lessonsRepo.deleteLesson(id);
  return deleted;
}
