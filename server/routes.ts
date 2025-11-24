import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { messageInsertSchema } from "@shared/schema";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/cv/download", (req, res) => {
    const filePath = path.join(process.cwd(), "public", "sample-cv.pdf");
    res.download(filePath, "Developer_CV.pdf", (err) => {
      if (err) {
        console.error("Error downloading CV:", err);
        res.status(500).json({ error: "Failed to download CV" });
      }
    });
  });

  app.post("/api/messages", async (req, res) => {
    try {
      const validated = messageInsertSchema.parse(req.body);
      const message = await storage.addMessage(validated);
      res.json(message);
    } catch (error) {
      res.status(400).json({ error: "Invalid message data" });
    }
  });

  app.get("/api/messages", async (req, res) => {
    try {
      const messages = await storage.getMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
