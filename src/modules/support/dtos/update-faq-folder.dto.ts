import z from "zod";
import { CreateFaqFolderDTO } from "./create-faq-folder.dto";

export const UpdateFaqFolderDTO = CreateFaqFolderDTO.partial().refine(
  (data) => Object.keys(data).length > 0,
  {
    message: "At least one field must be provided",
  },
);

export type UpdateFaqFolderDTO = z.infer<typeof UpdateFaqFolderDTO>;
