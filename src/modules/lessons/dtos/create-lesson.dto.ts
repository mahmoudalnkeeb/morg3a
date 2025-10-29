import z from "zod";
import { LessonDTO } from "./lesson.dto";

export const CreateLessonDTO = LessonDTO.omit({
  id: true,
  createdAt: true,
});

export type CreateLessonDTO = z.infer<typeof CreateLessonDTO>;
