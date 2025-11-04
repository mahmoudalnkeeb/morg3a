import { type CreateGradeDTO } from './dtos/create-grade.dto';
import { type UpdateGradeDTO } from './dtos/update-grade.dto';
import { createGradesRepository } from './repository';

import { db } from '@/db';
import { NotFoundError } from '@/utils/errors';

const gradesRepo = createGradesRepository(db);

export async function getGrades(page = 1, limit = 10) {
  return gradesRepo.getGrades(page, limit);
}

export async function getGrade(id: number) {
  const grade = await gradesRepo.getGrade(id);
  if (!grade) throw new NotFoundError('Grade not found');
  return grade;
}

export async function createGrade(data: CreateGradeDTO) {
  const newGrade = await gradesRepo.createGrade(data);
  return newGrade;
}

export async function updateGrade(id: number, data: UpdateGradeDTO) {
  const existing = await gradesRepo.getGrade(id);
  if (!existing) throw new NotFoundError('Grade not found');

  const updated = await gradesRepo.updateGrade(id, data);
  return updated;
}

export async function deleteGrade(id: number) {
  const existing = await gradesRepo.getGrade(id);
  if (!existing) throw new NotFoundError('Grade not found');

  const deleted = await gradesRepo.deleteGrade(id);
  return deleted;
}
