import {
  pgTable,
  serial,
  integer,
  boolean,
  timestamp,
  unique,
  index,
} from 'drizzle-orm/pg-core';
import { students } from './students';
import { videos } from './videos';

export const videoProgress = pgTable(
  'video_progress',
  {
    id: serial('id').primaryKey(),
    studentId: integer('student_id')
      .notNull()
      .references(() => students.id, {
        onDelete: 'cascade',
      }),
    videoId: integer('video_id')
      .notNull()
      .references(() => videos.id, {
        onDelete: 'cascade',
      }),
    lastPosition: integer('last_position').default(0), // Seconds watched
    watchDuration: integer('watch_duration').default(0), // Total seconds watched
    completed: boolean('completed').default(false),
    lastWatchedAt: timestamp('last_watched_at').defaultNow(),
  },
  (table) => [
    unique('video_progress_unique').on(table.studentId, table.videoId),
    index('idx_video_progress_student').on(table.studentId),
    index('idx_video_progress_video').on(table.videoId),
  ],
);
