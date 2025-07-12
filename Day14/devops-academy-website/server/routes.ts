// server/routes.ts - FULLY UNCOMMENTED AND CORRECTED VERSION
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage.js";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {

  // Get all learning paths
  app.get("/api/learning-paths", async (req, res) => {
    try {
      const paths = await storage.getAllLearningPaths();
      res.json(paths);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch learning paths" });
    }
  });

  // Get learning path with topics and progress
  app.get("/api/learning-paths/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const userId = req.query.userId ? parseInt(req.query.userId as string) : undefined;

      const path = await storage.getLearningPathWithTopics(id, userId);
      if (!path) {
        return res.status(404).json({ message: "Learning path not found" });
      }

      res.json(path);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch learning path" });
    }
  });

  // Get all topics
  app.get("/api/topics", async (req, res) => {
    try {
      const topics = await storage.getAllTopics();
      res.json(topics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch topics" });
    }
  });

  // 👇 IMPORTANT FIX: Move specific static route BEFORE dynamic route
  // Search topics
  app.get("/api/topics/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ message: "Search query is required" });
      }

      const topics = await storage.searchTopics(query);
      res.json(topics);
    } catch (error) {
      res.status(500).json({ message: "Failed to search topics" });
    }
  });

  // Get topic by slug
  app.get("/api/topics/:slug", async (req, res) => {
    try {
      const slug = req.params.slug;
      const userId = req.query.userId ? parseInt(req.query.userId as string) : undefined;

      const topic = await storage.getTopicBySlug(slug, userId);
      if (!topic) {
        return res.status(404).json({ message: "Topic not found" });
      }

      res.json(topic);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch topic" });
    }
  });

  // Update user progress
  app.post("/api/progress", async (req, res) => {
    try {
      const progressSchema = z.object({
        userId: z.number(),
        topicId: z.number(),
        completed: z.boolean().optional(),
        progressPercentage: z.number().min(0).max(100).optional(),
      });

      const validatedData = progressSchema.parse(req.body);
      const progress = await storage.updateUserProgress(validatedData);

      res.json(progress);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid progress data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update progress" });
    }
  });

  // Get user progress for a learning path
  app.get("/api/progress/:userId/path/:pathId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const pathId = parseInt(req.params.pathId);

      const progress = await storage.getUserProgressByPath(userId, pathId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user progress" });
    }
  });

  // Get code snippets for a topic
  app.get("/api/topics/:topicId/snippets", async (req, res) => {
    try {
      const topicId = parseInt(req.params.topicId);
      const snippets = await storage.getCodeSnippetsByTopic(topicId);
      res.json(snippets);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch code snippets" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
