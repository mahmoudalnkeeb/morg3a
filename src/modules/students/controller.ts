import type { Request, Response } from "express";
import { CreateStudentDto } from "./dtos/create-student.dto";
import * as studentService from "./service.ts";
import { successResponse } from "../../utils/messages.ts";

export async function createStudent(req: Request, res: Response) {
  const studentData: CreateStudentDto = await CreateStudentDto.parseAsync(
    req.body,
  );
  const student = await studentService.createStudent(studentData);
  const successMessage = "student created";
  return res.status(201).json(successResponse(successMessage, student));
}
