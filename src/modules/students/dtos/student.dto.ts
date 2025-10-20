import z from "zod";

export const StudentDTO = z.object({
  id: z.number().min(1),
  fullName: z.string().min(2).max(150).trim(),
  email: z.email().trim(),
  studentNumber: z.string().min(10).max(16).trim(),
  parentNumber: z.string().min(10).max(16).trim(),
  country: z.string().min(2).max(100).trim(),
  city: z.string().min(2).max(100).trim(),
  gradeId: z.number().min(1).nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type StudentDTO = z.infer<typeof StudentDTO>;
