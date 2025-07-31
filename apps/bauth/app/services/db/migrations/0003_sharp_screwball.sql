CREATE TABLE "profiles" (
	"id" text PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"default_address" uuid,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "addresses" ADD COLUMN "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_default_address_addresses_id_fk" FOREIGN KEY ("default_address") REFERENCES "public"."addresses"("id") ON DELETE cascade ON UPDATE no action;