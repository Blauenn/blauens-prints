import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const people = pgTable("people", {
  id: serial("id").primaryKey(),

  facebook: varchar("facebook", { length: 255 }),
  facebookHandle: varchar("facebook_handle", { length: 64 }),
  instagram: varchar("instagram", { length: 64 }),
});
