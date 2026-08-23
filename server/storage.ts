import { type User, type InsertUser, users } from "@shared/schema";
import { randomUUID } from "crypto";
import { eq, sql } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUsers(): Promise<User[]>;
  createUser(user: InsertUser): Promise<User>;
  deleteUser(userId: string): Promise<void>;
  updateUserPassword(userId: string, password: string): Promise<User>;
  updateUserStripeCustomerId(userId: string, stripeCustomerId: string): Promise<User>;
  updateUserEnrollment(userId: string, programName: string): Promise<User>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email?.toLowerCase() === email.toLowerCase(),
    );
  }

  async getUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      ...insertUser,
      id,
      isAdmin: insertUser.isAdmin ?? false,
      email: insertUser.email ?? null,
      stripeCustomerId: null,
      enrolledProgram: null,
      enrolledAt: null,
    };
    this.users.set(id, user);
    return user;
  }

  async deleteUser(userId: string): Promise<void> {
    if (!this.users.delete(userId)) throw new Error("User not found");
  }

  async updateUserPassword(userId: string, password: string): Promise<User> {
    const user = this.users.get(userId);
    if (!user) throw new Error("User not found");
    const updated = { ...user, password };
    this.users.set(userId, updated);
    return updated;
  }

  async updateUserStripeCustomerId(userId: string, stripeCustomerId: string): Promise<User> {
    const user = this.users.get(userId);
    if (!user) throw new Error("User not found");
    const updated = { ...user, stripeCustomerId };
    this.users.set(userId, updated);
    return updated;
  }

  async updateUserEnrollment(userId: string, programName: string): Promise<User> {
    const user = this.users.get(userId);
    if (!user) throw new Error("User not found");
    const updated = { ...user, enrolledProgram: programName, enrolledAt: new Date() };
    this.users.set(userId, updated);
    return updated;
  }
}

export const storage = new MemStorage();
