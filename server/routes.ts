import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
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

  const httpServer = createServer(app);

  return httpServer;
}
