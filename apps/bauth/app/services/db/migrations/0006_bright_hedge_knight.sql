CREATE TABLE "default_address" (
	"id" text PRIMARY KEY NOT NULL,
	"street_address" text NOT NULL,
	"secondary_address" text,
	"city" text NOT NULL,
	"state" text NOT NULL,
	"zip_code" text NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_default_address_addresses_id_fk";
--> statement-breakpoint
ALTER TABLE "addresses" ADD COLUMN "created_at" timestamp;--> statement-breakpoint
ALTER TABLE "addresses" ADD COLUMN "updated_at" timestamp;--> statement-breakpoint
ALTER TABLE "profiles" DROP COLUMN "default_address";