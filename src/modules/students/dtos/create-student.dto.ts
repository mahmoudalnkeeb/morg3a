import z from "zod";

/*
schema
const students = pgTable("students", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 150 }).notNull(),
  email: varchar("email", { length: 150 }).notNull(),
  studentNumber: varchar("student_number", { length: 50 }),
  parentNumber: varchar("parent_number", { length: 50 }),
  country: varchar("country", { length: 100 }).default("Egypt"),
  city: varchar("city", { length: 100 }),
  gradeId: integer("grade_id").references(() => grades.id, {
    onDelete: "set null",
  }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});


*/

export const Student = z.object({
  id: z.number().min(1).optional(),
  fullName: z.string().min(2).max(150).trim(),
  email: z.email().trim(),
  studentNumber: z.string().min(10).max(16).trim(),
  parentNumber: z.string().min(10).max(16).trim(),
  country: z.string().min(2).max(100).trim(),
  city: z.string().min(2).max(100).trim(),
  gradeId: z.number().min(1).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const CreateStudentDto = Student.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type Student = z.infer<typeof Student>;
export type CreateStudentDto = z.infer<typeof CreateStudentDto>;
