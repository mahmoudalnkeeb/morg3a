import { faqQuestions } from "@/db/schema";
import { createSelectSchema } from "drizzle-zod";
import z from "zod";

export const FaqQuestionDTO = createSelectSchema(faqQuestions);

export type FaqQuestionDTO = z.infer<typeof FaqQuestionDTO>;
