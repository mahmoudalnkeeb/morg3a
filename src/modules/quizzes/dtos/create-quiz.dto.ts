import z from "zod";
import { QuizDTO } from "./quiz.dto";

export const CreateQuizDTO = QuizDTO.omit({
  id: true,
});

export type CreateQuizDTO = z.infer<typeof CreateQuizDTO>;
