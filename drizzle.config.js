import { config } from 'dotenv';
import { defineConfig } from "drizzle-kit";

config({ path: '.env' });



export default defineConfig({
  schema:"./util/schema.js" ,
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.VITE_DATABASE_URL,
  },
});
