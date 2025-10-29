import type { Request, Response } from "express";
import * as courseService from "./service";
import { CreateCourseDTO } from "./dtos/create-course.dto";
import { failResponse, successResponse } from "@/utils/messages";
import { UpdateCourseDTO } from "./dtos/update-course.dto";

export async function getCourses(req: Request, res: Response) {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 10);
  const courses = await courseService.getCourses(page, limit);
  res.json(successResponse(courses));
}

export async function getCourse(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!id)
    return res.status(400).json(failResponse({ id: "invalid id parameter" }));
  const course = await courseService.getCourse(id);
  res.json(successResponse(course));
}

export async function createCourse(req: Request, res: Response) {
  const data = await CreateCourseDTO.parseAsync(req.body);
  const course = await courseService.createCourse(data);
  res.status(201).json(successResponse(course));
}

export async function updateCourse(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!id)
    return res.status(400).json(failResponse({ id: "invalid id parameter" }));
  const data = await UpdateCourseDTO.parseAsync(req.body);
  const course = await courseService.updateCourse(id, data);
  res.json(successResponse(course));
}

export async function deleteCourse(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!id)
    return res.status(400).json(failResponse({ id: "invalid id parameter" }));
  const deleted = await courseService.deleteCourse(id);
  res.json(successResponse(deleted));
}
