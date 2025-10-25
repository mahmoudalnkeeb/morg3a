import { courses } from "@/db/schema";
import { createSelectSchema } from "drizzle-zod";
import z from "zod";

export const CourseDTO = createSelectSchema(courses);

export type CourseDTO = z.infer<typeof CourseDTO>;
