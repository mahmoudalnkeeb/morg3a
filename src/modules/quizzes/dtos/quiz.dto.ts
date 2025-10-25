import { quizzes } from "@/db/schema";
import { createSelectSchema } from "drizzle-zod";
import z from "zod";

export const QuizDTO = createSelectSchema(quizzes);

export type QuizDTO = z.infer<typeof QuizDTO>;
