import type { Request, Response } from 'express';

import { CreateGradeDTO } from './dtos/create-grade.dto';
import { UpdateGradeDTO } from './dtos/update-grade.dto';
import * as gradeService from './service';

import { failResponse, successResponse } from '@/utils/messages';

export async function getGrades(req: Request, res: Response) {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 10);
  const grades = await gradeService.getGrades(page, limit);
  res.json(successResponse(grades));
}

export async function getGrade(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json(failResponse({ id: 'invalid id parameter' }));
  const grade = await gradeService.getGrade(id);
  res.json(successResponse(grade));
}

export async function createGrade(req: Request, res: Response) {
  const data = await CreateGradeDTO.parseAsync(req.body);
  const grade = await gradeService.createGrade(data);
  res.status(201).json(successResponse(grade));
}

export async function updateGrade(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json(failResponse({ id: 'invalid id parameter' }));
  const data = await UpdateGradeDTO.parseAsync(req.body);
  const grade = await gradeService.updateGrade(id, data);
  res.json(successResponse(grade));
}

export async function deleteGrade(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json(failResponse({ id: 'invalid id parameter' }));
  const deleted = await gradeService.deleteGrade(id);
  res.json(successResponse(deleted));
}
