import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const learningPaths = pgTable("learning_paths", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  level: text("level").notNull(), // beginner, intermediate, advanced
  icon: text("icon").notNull(),
  color: text("color").notNull(),
  order: integer("order").notNull(),
});

export const topics = pgTable("topics", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  content: text("content").notNull(), // markdown content
  icon: text("icon").notNull(),
  level: text("level").notNull(),
  readTime: integer("read_time").notNull(), // in minutes
  learnerCount: integer("learner_count").default(0),
  learningPathId: integer("learning_path_id").references(() => learningPaths.id),
  order: integer("order").notNull(),
  objectives: jsonb("objectives").$type<string[]>().notNull(),
  tags: jsonb("tags").$type<string[]>().default([]),
  prerequisites: jsonb("prerequisites").$type<string[]>().default([]),
});

export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  topicId: integer("topic_id").references(() => topics.id).notNull(),
  completed: boolean("completed").default(false),
  progressPercentage: integer("progress_percentage").default(0),
  lastAccessed: timestamp("last_accessed").defaultNow(),
});

export const codeSnippets = pgTable("code_snippets", {
  id: serial("id").primaryKey(),
  topicId: integer("topic_id").references(() => topics.id).notNull(),
  title: text("title").notNull(),
  language: text("language").notNull(),
  code: text("code").notNull(),
  description: text("description"),
  order: integer("order").notNull(),
});

// Schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertLearningPathSchema = createInsertSchema(learningPaths).omit({
  id: true,
});

export const insertTopicSchema = createInsertSchema(topics).omit({
  id: true,
});

export const insertUserProgressSchema = createInsertSchema(userProgress).omit({
  id: true,
  lastAccessed: true,
});

export const insertCodeSnippetSchema = createInsertSchema(codeSnippets).omit({
  id: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type LearningPath = typeof learningPaths.$inferSelect;
export type InsertLearningPath = z.infer<typeof insertLearningPathSchema>;
export type Topic = typeof topics.$inferSelect;
export type InsertTopic = z.infer<typeof insertTopicSchema>;
export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;
export type CodeSnippet = typeof codeSnippets.$inferSelect;
export type InsertCodeSnippet = z.infer<typeof insertCodeSnippetSchema>;

// Extended types for API responses
export type TopicWithProgress = Topic & {
  progress?: UserProgress;
  codeSnippets?: CodeSnippet[];
};

export type LearningPathWithTopics = LearningPath & {
  topics: TopicWithProgress[];
  completedCount: number;
  totalCount: number;
};
