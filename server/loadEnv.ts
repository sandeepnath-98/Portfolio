import path from "node:path";
import dotenv from "dotenv";

// Load environment variables from the project root `.env` file if present.
const envPath = path.resolve(process.cwd(), ".env");
const result = dotenv.config({ path: envPath });

if (result.error) {
  // No .env file found is okay — we simply use process.env values.
  // Avoid noisy logs in production.
  // console.info("No .env file found, using environment variables");
} else {
  console.info(`[env] Loaded environment variables from ${envPath}`);
}

export {};
