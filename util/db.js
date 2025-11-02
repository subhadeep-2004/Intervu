import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

// config({ path: ".env" }); // or .env.local
import * as schema from "./schema";

const sql = neon("postgresql://Intervu_owner:npg_a5bVEA3ThlvF@ep-falling-dawn-a4jczrc6-pooler.us-east-1.aws.neon.tech/Intervu?sslmode=require");
export const db = drizzle(sql,{schema});
