import mongoose from "mongoose";
import type { Message, MessageInsert } from "@shared/schema";

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const MessageModel =
  mongoose.models.Message || mongoose.model("Message", messageSchema);

export interface IStorage {
  addMessage(message: MessageInsert): Promise<Message>;
  getMessages(): Promise<Message[]>;
  deleteMessage(id: string): Promise<boolean>;
}

export class MongoStorage implements IStorage {
  async addMessage(message: MessageInsert): Promise<Message> {
    const newMessage = new MessageModel(message);
    const saved = await newMessage.save();
    return {
      id: saved._id.toString(),
      name: saved.name,
      email: saved.email,
      subject: saved.subject,
      message: saved.message,
      createdAt: saved.createdAt.toISOString(),
    };
  }

  async getMessages(): Promise<Message[]> {
    const messages = await MessageModel.find()
      .sort({ createdAt: -1 })
      .lean();
    return messages.map((msg: any) => ({
      id: msg._id.toString(),
      name: msg.name,
      email: msg.email,
      subject: msg.subject,
      message: msg.message,
      createdAt: new Date(msg.createdAt).toISOString(),
    }));
  }

  async deleteMessage(id: string): Promise<boolean> {
    const result = await MessageModel.findByIdAndDelete(id);
    return !!result;
  }
}

export class MemStorage implements IStorage {
  private messages: Map<string, Message> = new Map();

  async addMessage(message: MessageInsert): Promise<Message> {
    const id = Date.now().toString();
    const newMessage: Message = {
      ...message,
      id,
      createdAt: new Date().toISOString(),
    };
    this.messages.set(id, newMessage);
    return newMessage;
  }

  async getMessages(): Promise<Message[]> {
    return Array.from(this.messages.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async deleteMessage(id: string): Promise<boolean> {
    return this.messages.delete(id);
  }
}

let storage: IStorage;
let adminPassword: string = process.env.ADMIN_PASSWORD || "admin123";

async function initializeStorage(): Promise<IStorage> {
  const mongoUrl = process.env.MONGODB_URL;

  if (mongoUrl) {
    try {
      await mongoose.connect(mongoUrl);
      console.log("[mongodb] Connected to MongoDB");
      storage = new MongoStorage();
    } catch (error) {
      console.error("[mongodb] Failed to connect to MongoDB, falling back to memory storage:", error);
      storage = new MemStorage();
    }
  } else {
    console.log("[storage] No MongoDB URL provided, using in-memory storage");
    storage = new MemStorage();
  }

  return storage;
}

export { initializeStorage };
export const getStorage = () => storage;
export const verifyAdminPassword = (password: string) => password === adminPassword;
