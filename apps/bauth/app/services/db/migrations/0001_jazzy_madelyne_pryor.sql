CREATE TABLE "addresses" (
	"id" text PRIMARY KEY NOT NULL,
	"street_address" text NOT NULL,
	"secondary_address" text,
	"city" text NOT NULL,
	"state" text NOT NULL,
	"zip_code" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" text PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"default_address" text,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_default_address_addresses_id_fk" FOREIGN KEY ("default_address") REFERENCES "public"."addresses"("id") ON DELETE cascade ON UPDATE no action;