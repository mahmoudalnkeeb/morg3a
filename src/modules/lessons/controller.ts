import type { Request, Response } from "express";
import * as lessonService from "./service";
import { CreateLessonDTO } from "./dtos/create-lesson.dto";
import { failResponse, successResponse } from "@/utils/messages";
import { UpdateLessonDTO } from "./dtos/update-lesson.dto";

export async function getLessons(req: Request, res: Response) {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 10);
  const lessons = await lessonService.getLessons(page, limit);
  res.json(successResponse(lessons));
}

export async function getLesson(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!id)
    return res.status(400).json(failResponse({ id: "invalid id parameter" }));
  const lesson = await lessonService.getLesson(id);
  res.json(successResponse(lesson));
}

export async function createLesson(req: Request, res: Response) {
  const data = await CreateLessonDTO.parseAsync(req.body);
  const lesson = await lessonService.createLesson(data);
  res.status(201).json(successResponse(lesson));
}

export async function updateLesson(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!id)
    return res.status(400).json(failResponse({ id: "invalid id parameter" }));
  const data = await UpdateLessonDTO.parseAsync(req.body);
  const lesson = await lessonService.updateLesson(id, data);
  res.json(successResponse(lesson));
}

export async function deleteLesson(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!id)
    return res.status(400).json(failResponse({ id: "invalid id parameter" }));
  const deleted = await lessonService.deleteLesson(id);
  res.json(successResponse(deleted));
}
