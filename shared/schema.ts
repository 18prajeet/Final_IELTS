
import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  targetBand: text("target_band").notNull(),
  currentStreak: integer("current_streak").default(0),
  momentumScore: integer("momentum_score").default(0),
  avatar: text("avatar"),
  weaknesses: text("weaknesses").array(),
  strengths: text("strengths").array(),
});

export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  date: timestamp("date").notNull(),
  intensity: integer("intensity").notNull(), // 0-4 for heatmap
  type: text("type").notNull(), // 'practice', 'test', 'challenge'
  score: integer("score"),
});

export const challenges = pgTable("challenges", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  skill: text("skill").notNull(), // Reading, Writing, Listening, Speaking
  difficulty: text("difficulty").notNull(),
  estimatedTime: integer("estimated_time").notNull(), // in minutes
  isCompleted: boolean("is_completed").default(false),
  isAiTailored: boolean("is_ai_tailored").default(false),
});

export const badges = pgTable("badges", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  category: text("category").notNull(), // 'streak', 'score', 'activity'
  isUnlocked: boolean("is_unlocked").default(false),
  progress: integer("progress").default(0),
  target: integer("target").notNull(),
});

export const leaderboard = pgTable("leaderboard", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  rank: integer("rank").notNull(),
  score: integer("score").notNull(),
  momentum: integer("momentum").notNull(),
  avatar: text("avatar"),
});

// === SCHEMAS ===

export const insertUserSchema = createInsertSchema(users);
export const insertActivitySchema = createInsertSchema(activities);
export const insertChallengeSchema = createInsertSchema(challenges);
export const insertBadgeSchema = createInsertSchema(badges);
export const insertLeaderboardSchema = createInsertSchema(leaderboard);

// === EXPLICIT API TYPES ===

export type User = typeof users.$inferSelect;
export type Activity = typeof activities.$inferSelect;
export type Challenge = typeof challenges.$inferSelect;
export type Badge = typeof badges.$inferSelect;
export type LeaderboardEntry = typeof leaderboard.$inferSelect;

export type UserResponse = User;
export type ActivityResponse = Activity;
export type ChallengeResponse = Challenge;
export type BadgeResponse = Badge;
export type LeaderboardResponse = LeaderboardEntry;
