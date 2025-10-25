import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { CreateQuizDTO } from "./dtos/create-quiz.dto";
import { QuizDTO } from "./dtos/quiz.dto";
import { eq } from "drizzle-orm";
import { quizzes } from "@/db/schema";
import { UpdateQuizDTO } from "./dtos/update-quiz.dto";

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
    const quiz = await db
      .select()
      .from(quizzes)
      .where(eq(quizzes.id, id))
      .execute();

    return quiz[0] as QuizDTO | null;
  }

  async function createQuiz(data: CreateQuizDTO): Promise<QuizDTO> {
    const quiz = await db
      .insert(quizzes)
      .values(data)
      .returning();

    return quiz[0] as QuizDTO;
  }

  async function updateQuiz(
    id: number,
    data: UpdateQuizDTO,
  ): Promise<QuizDTO> {
    const quiz = await db
      .update(quizzes)
      .set(data)
      .where(eq(quizzes.id, id))
      .returning();

    return quiz[0] as QuizDTO;
  }

  async function deleteQuiz(id: number): Promise<QuizDTO> {
    const quiz = await db
      .delete(quizzes)
      .where(eq(quizzes.id, id))
      .returning();

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
