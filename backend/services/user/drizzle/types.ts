import {users, profile} from "./schema.js";

export type User = typeof users.$inferInsert;
export type Profile = typeof profile.$inferInsert;