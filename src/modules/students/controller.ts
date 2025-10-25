import type { Request, Response } from "express";
import * as studentService from "./service";
import { CreateStudentDTO } from "./dtos/create-student.dto";
import { failResponse, successResponse } from "@/utils/messages";
import { UpdateStudentDTO } from "./dtos/update-student.dto";

export async function getStudents(req: Request, res: Response) {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 10);
  const students = await studentService.getStudents(page, limit);
  res.json(successResponse(students));
}

export async function getStudent(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!id)
    return res.status(400).json(failResponse({ id: "invalid id parameter" }));
  const student = await studentService.getStudent(id);
  res.json(successResponse(student));
}

export async function createStudent(req: Request, res: Response) {
  const data = await CreateStudentDTO.parseAsync(req.body);
  const student = await studentService.createStudent(data);
  res.status(201).json(successResponse(student));
}

export async function updateStudent(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!id)
    return res.status(400).json(failResponse({ id: "invalid id parameter" }));
  const data = await UpdateStudentDTO.parseAsync(req.body);
  const student = await studentService.updateStudent(id, data);
  res.json(successResponse(student));
}

export async function deleteStudent(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!id)
    return res.status(400).json(failResponse({ id: "invalid id parameter" }));
  const deleted = await studentService.deleteStudent(id);
  res.json(successResponse(deleted));
}
