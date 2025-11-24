import express, { type Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import fs from "node:fs";
import session from "express-session";
import { getStorage, verifyAdminPassword } from "./storage";
import { messageInsertSchema, loginSchema } from "@shared/schema";
import path from "path";

declare module "express-session" {
  interface SessionData {
    authenticated: boolean;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve static files from the `public` directory so assets like
  // `/RESUME.pdf` are available in both dev and production modes.
  app.use(express.static(path.join(process.cwd(), "public")));

  app.use(
    session({
      secret: process.env.SESSION_SECRET || "dev-secret-key",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      },
    })
  );

  const isAuthenticated = (req: Request, res: Response, next: Function) => {
    if (req.session.authenticated) {
      next();
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  };

  app.get("/api/cv/download", (req, res) => {
    // Prefer the actual RESUME.pdf in `public/` if present. Fall back to
    // `sample-cv.pdf` for backwards compatibility.
    const publicDir = path.join(process.cwd(), "public");
    const preferred = path.join(publicDir, "RESUME.pdf");
    const fallback = path.join(publicDir, "sample-cv.pdf");

    let filePath: string | null = null;
    let downloadName = "RESUME.pdf";

    if (fs.existsSync(preferred)) {
      filePath = preferred;
      downloadName = path.basename(preferred);
    } else if (fs.existsSync(fallback)) {
      filePath = fallback;
      downloadName = path.basename(fallback);
    }

    if (!filePath) {
      res.status(404).json({ error: "CV not found" });
      return;
    }

    res.download(filePath, downloadName, (err) => {
      if (err) {
        console.error("Error downloading CV:", err);
        if (!res.headersSent) {
          res.status(500).json({ error: "Failed to download CV" });
        }
      }
    });
  });

  app.post("/api/auth/login", (req, res) => {
    try {
      const validated = loginSchema.parse(req.body);
      if (verifyAdminPassword(validated.password)) {
        req.session.authenticated = true;
        res.json({ success: true });
      } else {
        res.status(401).json({ error: "Invalid password" });
      }
    } catch (error) {
      res.status(400).json({ error: "Invalid request" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ error: "Failed to logout" });
      } else {
        res.json({ success: true });
      }
    });
  });

  app.get("/api/auth/check", (req, res) => {
    res.json({ authenticated: !!req.session.authenticated });
  });

  app.post("/api/messages", async (req, res) => {
    try {
      const validated = messageInsertSchema.parse(req.body);
      const storage = getStorage();
      const message = await storage.addMessage(validated);
      res.json(message);
    } catch (error) {
      res.status(400).json({ error: "Invalid message data" });
    }
  });

  app.get("/api/messages", isAuthenticated, async (req, res) => {
    try {
      const storage = getStorage();
      const messages = await storage.getMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  app.delete("/api/messages/:id", isAuthenticated, async (req, res) => {
    try {
      const storage = getStorage();
      const success = await storage.deleteMessage(req.params.id);
      if (success) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "Message not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete message" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
