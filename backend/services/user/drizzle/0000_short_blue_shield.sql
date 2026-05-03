CREATE TABLE "users" (
	"user_id" integer PRIMARY KEY NOT NULL,
	"email" varchar(150) NOT NULL,
	"username" varchar(100) NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"password" varchar(255),
	"created_at" timestamp DEFAULT now(),
	"avatar" text,
	"expires_at" timestamp NOT NULL,
	CONSTRAINT "users_email_key" UNIQUE("email"),
	CONSTRAINT "users_username_key" UNIQUE("username")
);
