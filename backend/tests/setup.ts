import { execSync } from "child_process";
import dotenv from "dotenv";

// Explicitly load the test environment variables
dotenv.config({ path: ".env.test" });

export default async () => {
  console.log("\n🔄 Preparing the local test database...");

  // Forces a clean reset of the test DB and applies all migrations from scratch
  execSync("npx prisma db push --force-reset", { stdio: "inherit" });

  console.log("✅ Test database schema is perfectly synced.\n");
};
