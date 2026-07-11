import {
  boolean,
  integer,
  pgTable,
  real,
  serial,
  timestamp,
  varchar,
  unique,
} from "drizzle-orm/pg-core";
import { categories } from "./categories";

export const images = pgTable(
  "images",
  {
    id: serial("id").primaryKey(),

    categoryId: integer("category_id")
      .references(() => categories.id)
      .notNull(),

    filename: varchar("filename", { length: 255 }).notNull(),
    number: integer("number"),

    imageUrl: varchar("image_url", { length: 255 }).notNull(),
    thumbnailUrl: varchar("thumbnail_url", { length: 255 }),

    width: integer("width"),
    height: integer("height"),

    cameraName: varchar("camera_name", { length: 64 }),
    cameraModel: varchar("camera_model", { length: 64 }),
    lensModel: varchar("lens_model", { length: 64 }),

    focalLength: integer("focal_length"),
    focalLengthMax: integer("focal_length_max"),

    iso: integer("iso"),
    exposureTime: varchar("exposureTime", { length: 32 }),
    aperture: real("aperture"),
    shotFocalLength: real("shot_focal_length"),
    flash: boolean("flash"),

    createdAt: timestamp("created_at"),
  },
  (table) => ({
    uniqueImageNumber: unique().on(table.categoryId, table.number),
  }),
);
