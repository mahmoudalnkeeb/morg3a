import { faqFolders } from "@/db/schema";
import { createSelectSchema } from "drizzle-zod";
import z from "zod";

export const FaqFolderDTO = createSelectSchema(faqFolders);

export type FaqFolderDTO = z.infer<typeof FaqFolderDTO>;
