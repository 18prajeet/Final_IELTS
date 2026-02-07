
import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.user.get.path, async (_req, res) => {
    const user = await storage.getUser();
    res.json(user);
  });

  app.patch(api.user.update.path, async (req, res) => {
    const update = api.user.update.input.parse(req.body);
    const user = await storage.updateUser(update);
    res.json(user);
  });

  app.get(api.activities.list.path, async (_req, res) => {
    const activities = await storage.getActivities();
    res.json(activities);
  });

  app.get(api.challenges.daily.path, async (_req, res) => {
    const challenges = await storage.getDailyChallenges();
    res.json(challenges);
  });

  app.post(api.challenges.complete.path, async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      const challenge = await storage.completeChallenge(id);
      res.json(challenge);
    } catch (e) {
      res.status(404).json({ message: "Challenge not found" });
    }
  });

  app.get(api.badges.list.path, async (_req, res) => {
    const badges = await storage.getBadges();
    res.json(badges);
  });

  app.get(api.leaderboard.list.path, async (_req, res) => {
    const leaderboard = await storage.getLeaderboard();
    res.json(leaderboard);
  });

  app.post(api.upload.test.path, async (_req, res) => {
    // Mock analysis delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    res.json({
      analysis: {
        score: 7.5,
        strengths: ["Vocabulary", "Task Response"],
        weaknesses: ["Grammar", "Cohesion"],
        feedback: "Great effort! Your vocabulary is strong, but focus on linking words to improve flow."
      }
    });
  });

  return httpServer;
}
