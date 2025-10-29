import { db } from "@/db";
import { createStudentsRepository } from "./repository";
import type { CreateStudentDTO } from "./dtos/create-student.dto";
import { NotFoundError } from "@/utils/errors";
import { UpdateStudentDTO } from "./dtos/update-student.dto";

const studentsRepo = createStudentsRepository(db);

export async function getStudents(page = 1, limit = 10) {
  return studentsRepo.getStudents(page, limit);
}

export async function getStudent(id: number) {
  const student = await studentsRepo.getStudent(id);
  if (!student) throw new NotFoundError("Student not found");
  return student;
}

export async function createStudent(data: CreateStudentDTO) {
  const newStudent = await studentsRepo.createStudent(data);
  return newStudent;
}

export async function updateStudent(id: number, data: UpdateStudentDTO) {
  const existing = await studentsRepo.getStudent(id);
  if (!existing) throw new NotFoundError("Student not found");

  const updated = await studentsRepo.updateStudent(id, data);
  return updated;
}

export async function deleteStudent(id: number) {
  const existing = await studentsRepo.getStudent(id);
  if (!existing) throw new NotFoundError("Student not found");

  const deleted = await studentsRepo.deleteStudent(id);
  return deleted;
}
