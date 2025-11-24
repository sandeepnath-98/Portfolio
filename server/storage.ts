import type { Message, MessageInsert } from "@shared/schema";

export interface IStorage {
  addMessage(message: MessageInsert): Promise<Message>;
  getMessages(): Promise<Message[]>;
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
}

export const storage = new MemStorage();
