CREATE TABLE "user_providers" (
	"user_id" integer PRIMARY KEY NOT NULL,
	"username" varchar(30) NOT NULL,
	"bio" varchar(250),
	"dob" timestamp,
	"followers" integer DEFAULT 0,
	"following" integer DEFAULT 0,
	"post_count" integer DEFAULT 0,
	"verified" boolean DEFAULT false NOT NULL,
	"avatar" text,
	CONSTRAINT "profile_username_key" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_username_key";--> statement-breakpoint
ALTER TABLE "user_providers" ADD CONSTRAINT "user_id_ref" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "username";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "email_verified";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "avatar";