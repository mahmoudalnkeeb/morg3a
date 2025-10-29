import { grades } from "@/db/schema";
import { createSelectSchema } from "drizzle-zod";
import z from "zod";

export const GradeDTO = createSelectSchema(grades);
export type GradeDTO = z.infer<typeof GradeDTO>;
