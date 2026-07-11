import {
  pgTable,
  serial,
  integer,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";

import { images } from "./images";
import { people } from "./people";
import { printLabs } from "./printLabs";

export const printJobs = pgTable("print_jobs", {
  id: serial("id").primaryKey(),

  imageId: integer("image_id")
    .references(() => images.id)
    .notNull(),

  personId: integer("person_id")
    .references(() => people.id)
    .notNull(),

  printLabId: integer("print_lab_id").references(() => printLabs.id),

  size: varchar("size", { length: 32 }),
  paperType: varchar("paper_type", { length: 64 }),

  sentToLabAt: timestamp("sent_to_lab_at"),
  receivedFromLabAt: timestamp("received_from_lab_at"),

  deliveredAt: timestamp("delivered_at"),
  deliveredTo: varchar("delivered_to", { length: 64 }),
});
