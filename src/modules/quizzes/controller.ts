import type { Request, Response } from "express";
import * as quizService from "./service";
import { CreateQuizDTO } from "./dtos/create-quiz.dto";
import { failResponse, successResponse } from "@/utils/messages";
import { UpdateQuizDTO } from "./dtos/update-quiz.dto";

export async function getQuizzes(req: Request, res: Response) {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 10);
  const quizzes = await quizService.getQuizzes(page, limit);
  res.json(successResponse(quizzes));
}

export async function getQuiz(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!id)
    return res.status(400).json(failResponse({ id: "invalid id parameter" }));
  const quiz = await quizService.getQuiz(id);
  res.json(successResponse(quiz));
}

export async function createQuiz(req: Request, res: Response) {
  const data = await CreateQuizDTO.parseAsync(req.body);
  const quiz = await quizService.createQuiz(data);
  res.status(201).json(successResponse(quiz));
}

export async function updateQuiz(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!id)
    return res.status(400).json(failResponse({ id: "invalid id parameter" }));
  const data = await UpdateQuizDTO.parseAsync(req.body);
  const quiz = await quizService.updateQuiz(id, data);
  res.json(successResponse(quiz));
}

export async function deleteQuiz(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!id)
    return res.status(400).json(failResponse({ id: "invalid id parameter" }));
  const deleted = await quizService.deleteQuiz(id);
  res.json(successResponse(deleted));
}
