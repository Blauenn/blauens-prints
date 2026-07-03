import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const printLabs = pgTable("print_labs", {
  id: serial("id").primaryKey(),

  name: varchar("name", { length: 64 }).notNull(),
});
