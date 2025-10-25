import { staff } from "@/db/schema";
import { createSelectSchema } from "drizzle-zod";
import z from "zod";

export const StaffDTO = createSelectSchema(staff);

export type StaffDTO = z.infer<typeof StaffDTO>;
