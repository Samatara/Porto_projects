import "dotenv/config";
import { z } from "zod";

console.log("Database URL:", process.env.DATABASE_URL);
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  FRONTEND_URL: z.string().url().optional().default("http://localhost:4093"),
  PORT: z.coerce.number().default(4093),
  DATABASE_URL: z.string().endsWith(".db"),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
  
});

export const env = envSchema.parse(process.env);
