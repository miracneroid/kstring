ALTER TABLE "user_providers" RENAME TO "profile";--> statement-breakpoint
ALTER TABLE "profile" DROP CONSTRAINT "user_id_ref";
--> statement-breakpoint
ALTER TABLE "profile" ADD CONSTRAINT "user_id_ref" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;