import { pgTable, serial, integer, timestamp, unique } from 'drizzle-orm/pg-core';
import { courses } from './courses';
import { staff } from './staff';
import { students } from './students';

export const studentCourses = pgTable(
  'student_courses',
  {
    id: serial('id').primaryKey(),
    studentId: integer('student_id')
      .notNull()
      .references(() => students.id, {
        onDelete: 'cascade',
      }),
    courseId: integer('course_id')
      .notNull()
      .references(() => courses.id, {
        onDelete: 'cascade',
      }),
    enrolledAt: timestamp('enrolled_at').defaultNow().notNull(),
    enrolledBy: integer('enrolled_by')
      .notNull()
      .references(() => staff.id),
  },
  (table) => [unique('student_courses_unique').on(table.studentId, table.courseId)],
);
