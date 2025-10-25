import { db } from "@/db";
import { createLessonsRepository } from "./repository";
import type { CreateLessonDTO } from "./dtos/create-lesson.dto";
import { NotFoundError } from "@/utils/errors";
import { UpdateLessonDTO } from "./dtos/update-lesson.dto";

const lessonsRepo = createLessonsRepository(db);

export async function getLessons(page = 1, limit = 10) {
  return lessonsRepo.getLessons(page, limit);
}

export async function getLesson(id: number) {
  const lesson = await lessonsRepo.getLesson(id);
  if (!lesson) throw new NotFoundError("Lesson not found");
  return lesson;
}

export async function createLesson(data: CreateLessonDTO) {
  const newLesson = await lessonsRepo.createLesson(data);
  return newLesson;
}

export async function updateLesson(id: number, data: UpdateLessonDTO) {
  const existing = await lessonsRepo.getLesson(id);
  if (!existing) throw new NotFoundError("Lesson not found");

  const updated = await lessonsRepo.updateLesson(id, data);
  return updated;
}

export async function deleteLesson(id: number) {
  const existing = await lessonsRepo.getLesson(id);
  if (!existing) throw new NotFoundError("Lesson not found");

  const deleted = await lessonsRepo.deleteLesson(id);
  return deleted;
}
