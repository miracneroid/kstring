import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from "./drizzle/index.js";
import 'dotenv/config';

async function main() {
    console.log("Running migrations...");
    try {
        await migrate(db, { migrationsFolder: "./drizzle" });
        console.log("Migrations complete!");
    } catch (e) {
        console.error("Migration error:", e);
    }
    process.exit(0);
}

main();
