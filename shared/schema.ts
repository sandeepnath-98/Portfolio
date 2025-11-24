import { z } from "zod";

export const skillSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  proficiency: z.number().min(0).max(100),
  icon: z.string(),
});

export const timelineEventSchema = z.object({
  id: z.string(),
  date: z.string(),
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  position: z.enum(["top", "bottom"]),
});

export const socialLinkSchema = z.object({
  platform: z.enum(["instagram", "linkedin", "github"]),
  url: z.string().url(),
  icon: z.string(),
});

export const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  technologies: z.array(z.string()),
  image: z.string().optional(),
  demoUrl: z.string().url().optional(),
  repoUrl: z.string().url().optional(),
});

export const hackathonSchema = z.object({
  id: z.string(),
  name: z.string(),
  date: z.string(),
  description: z.string(),
  position: z.string(),
  prize: z.string().optional(),
  technologies: z.array(z.string()),
  projectUrl: z.string().url().optional(),
});

export const hobbySchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.enum(["fitness", "travel", "photography", "gaming", "sports"]),
  description: z.string(),
  highlights: z.array(z.string()),
  icon: z.string(),
  images: z.array(z.string()),
});

export const messageSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  subject: z.string(),
  message: z.string(),
  createdAt: z.string(),
});

export const messageInsertSchema = messageSchema.omit({ id: true, createdAt: true });

export const loginSchema = z.object({
  password: z.string().min(1),
});

export type Skill = z.infer<typeof skillSchema>;
export type TimelineEvent = z.infer<typeof timelineEventSchema>;
export type SocialLink = z.infer<typeof socialLinkSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Hackathon = z.infer<typeof hackathonSchema>;
export type Hobby = z.infer<typeof hobbySchema>;
export type Message = z.infer<typeof messageSchema>;
export type MessageInsert = z.infer<typeof messageInsertSchema>;
export type Login = z.infer<typeof loginSchema>;
