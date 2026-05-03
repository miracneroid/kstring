import { pgTable, integer, boolean, text, varchar, foreignKey, timestamp, unique} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	userId: integer("user_id").primaryKey(),
	email: varchar({ length: 150 }).notNull(),
	password: varchar({ length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
  	expiresAt: timestamp("expires_at").notNull()
}, (table) => [
	unique("users_email_key").on(table.email),
]);

export const profile = pgTable("profile", {
	userId: integer("user_id").primaryKey(),
	username: varchar({length: 30}).notNull(),
	bio: varchar({length: 250}),
	dob: timestamp("dob"),
	followers: integer("followers").default(0),
	following: integer("following").default(0),
	postCount: integer("post_count").default(0),
	verified: boolean("verified").default(false).notNull(),
	avatar: text(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.userId],
			name: "user_id_ref"
		}).onDelete("cascade"),
		unique("profile_username_key").on(table.username),
]);