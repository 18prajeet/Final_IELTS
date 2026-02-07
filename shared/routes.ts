
import { z } from 'zod';
import { 
  insertUserSchema, 
  insertActivitySchema,
  insertChallengeSchema,
  insertBadgeSchema,
  insertLeaderboardSchema,
  users,
  activities,
  challenges,
  badges,
  leaderboard
} from './schema';

export const errorSchemas = {
  notFound: z.object({ message: z.string() }),
  validation: z.object({ message: z.string() }),
};

export const api = {
  user: {
    get: {
      method: 'GET' as const,
      path: '/api/user' as const,
      responses: {
        200: z.custom<typeof users.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    update: {
      method: 'PATCH' as const,
      path: '/api/user' as const,
      input: insertUserSchema.partial(),
      responses: {
        200: z.custom<typeof users.$inferSelect>(),
      },
    },
  },
  activities: {
    list: {
      method: 'GET' as const,
      path: '/api/activities' as const,
      responses: {
        200: z.array(z.custom<typeof activities.$inferSelect>()),
      },
    },
  },
  challenges: {
    daily: {
      method: 'GET' as const,
      path: '/api/challenges/daily' as const,
      responses: {
        200: z.array(z.custom<typeof challenges.$inferSelect>()),
      },
    },
    complete: {
      method: 'POST' as const,
      path: '/api/challenges/:id/complete' as const,
      responses: {
        200: z.custom<typeof challenges.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  badges: {
    list: {
      method: 'GET' as const,
      path: '/api/badges' as const,
      responses: {
        200: z.array(z.custom<typeof badges.$inferSelect>()),
      },
    },
  },
  leaderboard: {
    list: {
      method: 'GET' as const,
      path: '/api/leaderboard' as const,
      responses: {
        200: z.array(z.custom<typeof leaderboard.$inferSelect>()),
      },
    },
  },
  upload: {
    test: {
      method: 'POST' as const,
      path: '/api/upload/test' as const,
      input: z.object({}), // Mock input
      responses: {
        200: z.object({
          analysis: z.object({
            score: z.number(),
            strengths: z.array(z.string()),
            weaknesses: z.array(z.string()),
            feedback: z.string(),
          })
        }),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
