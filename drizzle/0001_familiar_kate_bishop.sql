CREATE TABLE "print_jobs" (
	"id" serial PRIMARY KEY NOT NULL,
	"image_id" integer NOT NULL,
	"person_id" integer NOT NULL,
	"print_lab_id" integer,
	"size" varchar(32),
	"paper_type" varchar(64),
	"sent_to_lab_at" timestamp,
	"received_from_lab_at" timestamp,
	"delivered_at" timestamp,
	"delivered_to" varchar(64)
);
--> statement-breakpoint
ALTER TABLE "images" ALTER COLUMN "category_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "images" ALTER COLUMN "image_url" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "images" ALTER COLUMN "thumbnail_url" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "images" ALTER COLUMN "camera_name" SET DATA TYPE varchar(64);--> statement-breakpoint
ALTER TABLE "images" ALTER COLUMN "camera_model" SET DATA TYPE varchar(64);--> statement-breakpoint
ALTER TABLE "images" ALTER COLUMN "lens_model" SET DATA TYPE varchar(64);--> statement-breakpoint
ALTER TABLE "images" ALTER COLUMN "created_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "print_jobs" ADD CONSTRAINT "print_jobs_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "print_jobs" ADD CONSTRAINT "print_jobs_person_id_people_id_fk" FOREIGN KEY ("person_id") REFERENCES "public"."people"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "print_jobs" ADD CONSTRAINT "print_jobs_print_lab_id_print_labs_id_fk" FOREIGN KEY ("print_lab_id") REFERENCES "public"."print_labs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "images" ADD CONSTRAINT "images_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "images" DROP COLUMN "print_lab_id";--> statement-breakpoint
ALTER TABLE "images" DROP COLUMN "is_printed";--> statement-breakpoint
ALTER TABLE "images" DROP COLUMN "sent_to_lab_at";--> statement-breakpoint
ALTER TABLE "images" DROP COLUMN "received_from_lab_at";--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "images" ADD CONSTRAINT "images_category_id_number_unique" UNIQUE("category_id","number");--> statement-breakpoint
ALTER TABLE "print_labs" ADD CONSTRAINT "print_labs_name_unique" UNIQUE("name");