import { lessons } from "@/db/schema";
import { createSelectSchema } from "drizzle-zod";
import z from "zod";

export const LessonDTO = createSelectSchema(lessons);

export type LessonDTO = z.infer<typeof LessonDTO>;
