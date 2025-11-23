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

export type Skill = z.infer<typeof skillSchema>;
export type TimelineEvent = z.infer<typeof timelineEventSchema>;
export type SocialLink = z.infer<typeof socialLinkSchema>;
