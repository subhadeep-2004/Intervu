import { config } from 'dotenv';
import { defineConfig } from "drizzle-kit";

config({ path: '.env' });



export default defineConfig({
  schema:"./util/schema.js" ,
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://Intervu_owner:npg_a5bVEA3ThlvF@ep-falling-dawn-a4jczrc6-pooler.us-east-1.aws.neon.tech/Intervu?sslmode=require",
  },
});
