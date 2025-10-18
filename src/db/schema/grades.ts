import {
  pgTable,
  uuid,
  varchar,
  smallint,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const grades = pgTable("grades", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  specialization: varchar("specialization", { length: 100 }),
  year: smallint("year"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
