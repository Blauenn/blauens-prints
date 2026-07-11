import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),

  name: varchar("name", { length: 64 }).notNull().unique(),
});
