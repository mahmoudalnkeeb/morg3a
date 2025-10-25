import z from "zod";
import { CreateLessonDTO } from "./create-lesson.dto";

export const UpdateLessonDTO = CreateLessonDTO.partial().refine(
  (data) => Object.keys(data).length > 0,
  {
    message: "At least one field must be provided",
  },
);

export type UpdateLessonDTO = z.infer<typeof UpdateLessonDTO>;
