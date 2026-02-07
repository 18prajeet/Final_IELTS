
import { 
  users, activities, challenges, badges, leaderboard,
  type User, type Activity, type Challenge, type Badge, type LeaderboardEntry,
  type InsertUser, type InsertActivity, type InsertChallenge, type InsertBadge, type InsertLeaderboard
} from "@shared/schema";

export interface IStorage {
  getUser(): Promise<User>;
  updateUser(update: Partial<InsertUser>): Promise<User>;
  getActivities(): Promise<Activity[]>;
  getDailyChallenges(): Promise<Challenge[]>;
  completeChallenge(id: number): Promise<Challenge>;
  getBadges(): Promise<Badge[]>;
  getLeaderboard(): Promise<LeaderboardEntry[]>;
}

export class MemStorage implements IStorage {
  private user: User;
  private activities: Activity[] = [];
  private challenges: Challenge[] = [];
  private badges: Badge[] = [];
  private leaderboard: LeaderboardEntry[] = [];

  constructor() {
    // Seed realistic dummy data
    this.user = {
      id: 1,
      name: "Alex Chen",
      email: "alex@example.com",
      targetBand: "8.0",
      currentStreak: 12,
      momentumScore: 84,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      weaknesses: ["Writing Task 2", "Speaking Fluency"],
      strengths: ["Listening", "Reading"],
    };

    // Generate heatmap data (last 365 days)
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Random activity intensity
      if (Math.random() > 0.3) {
        this.activities.push({
          id: i,
          userId: 1,
          date: date,
          intensity: Math.floor(Math.random() * 5), // 0-4
          type: 'practice',
          score: Math.floor(Math.random() * 100)
        });
      }
    }

    this.challenges = [
      {
        id: 1,
        title: "Advanced Vocabulary Construction",
        skill: "Writing",
        difficulty: "Hard",
        estimatedTime: 15,
        isCompleted: false,
        isAiTailored: true, // Matches weakness
      },
      {
        id: 2,
        title: "Quick-fire Speaking Part 2",
        skill: "Speaking",
        difficulty: "Medium",
        estimatedTime: 10,
        isCompleted: false,
        isAiTailored: true,
      }
    ];

    this.badges = [
      {
        id: 1,
        name: "7 Day Streak",
        description: "Maintained a 7-day learning streak",
        icon: "🔥",
        category: "streak",
        isUnlocked: true,
        progress: 7,
        target: 7
      },
      {
        id: 2,
        name: "30 Day Streak",
        description: "Maintain a 30-day learning streak",
        icon: "🏆",
        category: "streak",
        isUnlocked: false,
        progress: 12,
        target: 30
      },
      {
        id: 3,
        name: "Grammar Guru",
        description: "Score 90%+ in 5 grammar tests",
        icon: "📚",
        category: "score",
        isUnlocked: false,
        progress: 3,
        target: 5
      }
    ];

    this.leaderboard = [
      { id: 1, name: "Sarah J.", rank: 1, score: 9850, momentum: 98, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
      { id: 2, name: "Mike T.", rank: 2, score: 9720, momentum: 95, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike" },
      { id: 3, name: "Alex Chen", rank: 3, score: 9680, momentum: 84, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" },
      { id: 4, name: "Emma W.", rank: 4, score: 8540, momentum: 78, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma" },
      { id: 5, name: "David L.", rank: 5, score: 8200, momentum: 72, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David" },
    ];
  }

  async getUser(): Promise<User> {
    return this.user;
  }

  async updateUser(update: Partial<InsertUser>): Promise<User> {
    this.user = { ...this.user, ...update };
    return this.user;
  }

  async getActivities(): Promise<Activity[]> {
    return this.activities;
  }

  async getDailyChallenges(): Promise<Challenge[]> {
    return this.challenges;
  }

  async completeChallenge(id: number): Promise<Challenge> {
    const challenge = this.challenges.find(c => c.id === id);
    if (!challenge) throw new Error("Challenge not found");
    challenge.isCompleted = true;
    return challenge;
  }

  async getBadges(): Promise<Badge[]> {
    return this.badges;
  }

  async getLeaderboard(): Promise<LeaderboardEntry[]> {
    return this.leaderboard;
  }
}

export const storage = new MemStorage();
