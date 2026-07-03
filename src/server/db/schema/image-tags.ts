import { pgTable, integer, primaryKey } from "drizzle-orm/pg-core";
import { images } from "./images";
import { tags } from "./tags";

export const imageTags = pgTable(
  "image_tags",
  {
    imageId: integer("image_id")
      .notNull()
      .references(() => images.id),

    tagId: integer("tag_id")
      .notNull()
      .references(() => tags.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.imageId, t.tagId] }),
  }),
);
