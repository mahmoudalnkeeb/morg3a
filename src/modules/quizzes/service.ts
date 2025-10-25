import { db } from "@/db";
import { createQuizzesRepository } from "./repository";
import type { CreateQuizDTO } from "./dtos/create-quiz.dto";
import { NotFoundError } from "@/utils/errors";
import { UpdateQuizDTO } from "./dtos/update-quiz.dto";

const quizzesRepo = createQuizzesRepository(db);

export async function getQuizzes(page = 1, limit = 10) {
  return quizzesRepo.getQuizzes(page, limit);
}

export async function getQuiz(id: number) {
  const quiz = await quizzesRepo.getQuiz(id);
  if (!quiz) throw new NotFoundError("Quiz not found");
  return quiz;
}

export async function createQuiz(data: CreateQuizDTO) {
  const newQuiz = await quizzesRepo.createQuiz(data);
  return newQuiz;
}

export async function updateQuiz(id: number, data: UpdateQuizDTO) {
  const existing = await quizzesRepo.getQuiz(id);
  if (!existing) throw new NotFoundError("Quiz not found");

  const updated = await quizzesRepo.updateQuiz(id, data);
  return updated;
}

export async function deleteQuiz(id: number) {
  const existing = await quizzesRepo.getQuiz(id);
  if (!existing) throw new NotFoundError("Quiz not found");

  const deleted = await quizzesRepo.deleteQuiz(id);
  return deleted;
}
