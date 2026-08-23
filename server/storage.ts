import {
  type User,
  type InsertUser,
  type UpdateProfile,
  type Registration,
  type InsertRegistration,
  type UpdateRegistration,
  users,
  registrations as registrationsTable,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUsers(): Promise<User[]>;
  createUser(user: InsertUser): Promise<User>;
  deleteUser(userId: string): Promise<void>;
  updateUserProfile(userId: string, data: UpdateProfile): Promise<User>;
  updateUserPassword(userId: string, password: string): Promise<User>;
  updateUserStripeCustomerId(userId: string, stripeCustomerId: string): Promise<User>;
  updateUserEnrollment(userId: string, programName: string): Promise<User>;

  // Registrations
  getRegistrations(): Promise<Registration[]>;
  getRegistration(id: string): Promise<Registration | undefined>;
  createRegistration(data: InsertRegistration): Promise<Registration>;
  updateRegistration(id: string, data: UpdateRegistration): Promise<Registration>;
  deleteRegistration(id: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private registrations: Map<string, Registration>;

  constructor() {
    this.users = new Map();
    this.registrations = new Map();
    this._seedRegistrations();
  }

  private _seedRegistrations() {
    const seeds: Registration[] = [
      { id: "r1", name: "Petra Bandula",   program: "Group Session",     status: "Confirmed", payment: "Paid",   date: "2026-02-15", notes: null, userId: null },
      { id: "r2", name: "Viktoria Brodar", program: "Private Session",   status: "Confirmed", payment: "Paid",   date: "2026-02-18", notes: null, userId: null },
      { id: "r3", name: "Diago Delgado",   program: "March Break Camp",  status: "Pending",   payment: "Unpaid", date: "2026-02-20", notes: null, userId: null },
      { id: "r4", name: "Lucas Martinez",  program: "Group Session",     status: "Pending",   payment: "Unpaid", date: "2026-02-22", notes: null, userId: null },
      { id: "r5", name: "Sofia Chen",      program: "Justplay",          status: "Confirmed", payment: "Paid",   date: "2026-02-25", notes: null, userId: null },
      { id: "r6", name: "Amir Hassan",     program: "Summer Camp",       status: "Pending",   payment: "Unpaid", date: "2026-02-28", notes: null, userId: null },
      { id: "r7", name: "Emma Wilson",     program: "Private Session",   status: "Confirmed", payment: "Unpaid", date: "2026-03-01", notes: null, userId: null },
      { id: "r8", name: "Kai Nakamura",    program: "GingaFit",          status: "Pending",   payment: "Unpaid", date: "2026-03-02", notes: null, userId: null },
    ];
    for (const r of seeds) this.registrations.set(r.id, r);
  }

  // ── Users ──────────────────────────────────────────────────────────────────

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find((u) => u.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (u) => u.email?.toLowerCase() === email.toLowerCase()
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
      name: null,
      phone: null,
      emergencyContact: null,
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

  async updateUserProfile(userId: string, data: UpdateProfile): Promise<User> {
    const user = this.users.get(userId);
    if (!user) throw new Error("User not found");
    const updated: User = {
      ...user,
      name: data.name !== undefined ? (data.name || null) : user.name,
      email: data.email !== undefined ? (data.email || null) : user.email,
      phone: data.phone !== undefined ? (data.phone || null) : user.phone,
      emergencyContact:
        data.emergencyContact !== undefined
          ? data.emergencyContact || null
          : user.emergencyContact,
    };
    this.users.set(userId, updated);
    return updated;
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

  // ── Registrations ──────────────────────────────────────────────────────────

  async getRegistrations(): Promise<Registration[]> {
    return Array.from(this.registrations.values()).sort(
      (a, b) => b.date.localeCompare(a.date)
    );
  }

  async getRegistration(id: string): Promise<Registration | undefined> {
    return this.registrations.get(id);
  }

  async createRegistration(data: InsertRegistration): Promise<Registration> {
    const id = randomUUID();
    const reg: Registration = {
      id,
      name: data.name,
      program: data.program,
      status: data.status ?? "Pending",
      payment: data.payment ?? "Unpaid",
      date: data.date,
      notes: data.notes ?? null,
      userId: data.userId ?? null,
    };
    this.registrations.set(id, reg);
    return reg;
  }

  async updateRegistration(id: string, data: UpdateRegistration): Promise<Registration> {
    const reg = this.registrations.get(id);
    if (!reg) throw new Error("Registration not found");
    const updated: Registration = {
      ...reg,
      ...(data.name !== undefined && { name: data.name }),
      ...(data.program !== undefined && { program: data.program }),
      ...(data.status !== undefined && { status: data.status }),
      ...(data.payment !== undefined && { payment: data.payment }),
      ...(data.date !== undefined && { date: data.date }),
      ...(data.notes !== undefined && { notes: data.notes ?? null }),
      ...(data.userId !== undefined && { userId: data.userId ?? null }),
    };
    this.registrations.set(id, updated);
    return updated;
  }

  async deleteRegistration(id: string): Promise<void> {
    if (!this.registrations.delete(id)) throw new Error("Registration not found");
  }
}

export const storage = new MemStorage();
