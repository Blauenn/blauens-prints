CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(64) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "deliveries" (
	"image_id" integer NOT NULL,
	"person_id" integer NOT NULL,
	"is_delivered" boolean DEFAULT false,
	"delivered_at" timestamp,
	CONSTRAINT "deliveries_image_id_person_id_pk" PRIMARY KEY("image_id","person_id")
);
--> statement-breakpoint
CREATE TABLE "image_tags" (
	"image_id" integer NOT NULL,
	"tag_id" integer NOT NULL,
	CONSTRAINT "image_tags_image_id_tag_id_pk" PRIMARY KEY("image_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE "images" (
	"id" serial PRIMARY KEY NOT NULL,
	"category_id" integer,
	"print_lab_id" integer,
	"filename" varchar(255) NOT NULL,
	"number" integer,
	"title" varchar(255),
	"image_url" varchar(2048) NOT NULL,
	"thumbnail_url" varchar(2048),
	"is_printed" boolean DEFAULT false,
	"sent_to_lab_at" timestamp,
	"received_from_lab_at" timestamp,
	"width" integer,
	"height" integer,
	"camera_name" varchar(255),
	"camera_model" varchar(255),
	"lens_model" varchar(255),
	"focal_length" integer,
	"focal_length_max" integer,
	"iso" integer,
	"shutter" varchar(32),
	"aperture" real,
	"shot_focal_length" real,
	"flash" boolean,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(64) NOT NULL,
	CONSTRAINT "tags_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "people" (
	"id" serial PRIMARY KEY NOT NULL,
	"facebook" varchar(255),
	"facebook_handle" varchar(64),
	"instagram" varchar(64)
);
--> statement-breakpoint
CREATE TABLE "print_labs" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(64) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_person_id_people_id_fk" FOREIGN KEY ("person_id") REFERENCES "public"."people"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "image_tags" ADD CONSTRAINT "image_tags_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "image_tags" ADD CONSTRAINT "image_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE no action ON UPDATE no action;