import {
  pgTable,
  integer,
  boolean,
  timestamp,
  primaryKey,
} from "drizzle-orm/pg-core";
import { images } from "./images";
import { people } from "./people";

export const deliveries = pgTable(
  "deliveries",
  {
    imageId: integer("image_id")
      .notNull()
      .references(() => images.id),

    personId: integer("person_id")
      .notNull()
      .references(() => people.id),

    isDelivered: boolean("is_delivered").default(false),

    deliveredAt: timestamp("delivered_at"),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.imageId, t.personId] }),
  }),
);
