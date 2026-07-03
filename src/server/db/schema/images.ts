import {
  boolean,
  integer,
  pgTable,
  real,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const images = pgTable("images", {
  id: serial("id").primaryKey(),

  categoryId: integer("category_id"),
  printLabId: integer("print_lab_id"),

  filename: varchar("filename", { length: 255 }).notNull(),
  number: integer("number"),
  title: varchar("title", { length: 255 }),

  imageUrl: varchar("image_url", { length: 2048 }).notNull(),
  thumbnailUrl: varchar("thumbnail_url", { length: 2048 }),

  isPrinted: boolean("is_printed").default(false),

  sentToLabAt: timestamp("sent_to_lab_at"),
  receivedFromLabAt: timestamp("received_from_lab_at"),

  width: integer("width"),
  height: integer("height"),

  cameraName: varchar("camera_name", { length: 255 }),
  cameraModel: varchar("camera_model", { length: 255 }),
  lensModel: varchar("lens_model", { length: 255 }),

  focalLength: integer("focal_length"),
  focalLengthMax: integer("focal_length_max"),

  iso: integer("iso"),
  shutter: varchar("shutter", { length: 32 }),
  aperture: real("aperture"),
  shotFocalLength: real("shot_focal_length"),
  flash: boolean("flash"),

  createdAt: timestamp("created_at").defaultNow(),
});
