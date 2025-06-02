import { pgTable, serial, text, varchar, timestamp,jsonb  } from "drizzle-orm/pg-core";

export const MockInterview = pgTable("mock_interview", {
  id: serial("id").primaryKey(),
  jsonMockResp: text("jsonMockResp").notNull(),
  jobPosition: varchar("jobPosition").notNull(),
  jobDescription: varchar("jobDescription").notNull(),
  jobExperience: varchar("jobExperience").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt:  timestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
  mockId: varchar("mockId").notNull(),
  question: varchar("question").notNull(),
});



export const UserAnswers = pgTable("userAnswer",{

  id: serial("id").primaryKey(),
  mockIdRef : varchar("mockIdRef").notNull(),
  question: varchar("question").notNull(),
  // correctAns: text('correctAns'),
  // userAns: text('userAns'),
  feedback: varchar('feedback').notNull(),
  // rating: varchar('rating'),
  // userEmaill: varchar('userEmail'),
   createdAt:  timestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),

createdBy: varchar("createdBy").notNull(),




})






