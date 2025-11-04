import { eq } from 'drizzle-orm';
import { type NodePgDatabase } from 'drizzle-orm/node-postgres';

import { type CreateQuizDTO } from './dtos/create-quiz.dto';
import { type QuizDTO } from './dtos/quiz.dto';
import { type UpdateQuizDTO } from './dtos/update-quiz.dto';

import { quizzes } from '@/db/schema';

export function createQuizzesRepository(db: NodePgDatabase) {
  async function getQuizzes(page = 1, limit = 10): Promise<QuizDTO[]> {
    const result = await db
      .select()
      .from(quizzes)
      .limit(limit)
      .offset((page - 1) * limit)
      .execute();

    return result as QuizDTO[];
  }

  async function getQuiz(id: number): Promise<QuizDTO | null> {
    const quiz = await db.select().from(quizzes).where(eq(quizzes.id, id)).execute();

    return quiz[0] as QuizDTO | null;
  }

  async function createQuiz(data: CreateQuizDTO): Promise<QuizDTO> {
    const quiz = await db.insert(quizzes).values(data).returning();

    return quiz[0] as QuizDTO;
  }

  async function updateQuiz(id: number, data: UpdateQuizDTO): Promise<QuizDTO> {
    const quiz = await db.update(quizzes).set(data).where(eq(quizzes.id, id)).returning();

    return quiz[0] as QuizDTO;
  }

  async function deleteQuiz(id: number): Promise<QuizDTO> {
    const quiz = await db.delete(quizzes).where(eq(quizzes.id, id)).returning();

    return quiz[0] as QuizDTO;
  }

  return {
    getQuizzes,
    getQuiz,
    createQuiz,
    updateQuiz,
    deleteQuiz,
  };
}
