import z from "zod";
import { CreateQuizDTO } from "./create-quiz.dto";

export const UpdateQuizDTO = CreateQuizDTO.partial().refine(
  (data) => Object.keys(data).length > 0,
  {
    message: "At least one field must be provided",
  },
);

export type UpdateQuizDTO = z.infer<typeof UpdateQuizDTO>;
