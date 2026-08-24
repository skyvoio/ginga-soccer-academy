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
import { asc, desc, eq, ilike } from "drizzle-orm";
import { db } from "./db";

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

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(ilike(users.email, email)).limit(1);
    return user;
  }

  async getUsers(): Promise<User[]> {
    return db.select().from(users).orderBy(asc(users.username));
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values({
      username: insertUser.username,
      password: insertUser.password,
      isAdmin: insertUser.isAdmin ?? false,
      email: insertUser.email ?? null,
    }).returning();
    return user;
  }

  async deleteUser(userId: string): Promise<void> {
    const deleted = await db.delete(users)
      .where(eq(users.id, userId))
      .returning({ id: users.id });
    if (deleted.length === 0) throw new Error("User not found");
  }

  async updateUserProfile(userId: string, data: UpdateProfile): Promise<User> {
    const [updated] = await db.update(users)
      .set({
        name: data.name === undefined ? undefined : data.name || null,
        email: data.email === undefined ? undefined : data.email || null,
        phone: data.phone === undefined ? undefined : data.phone || null,
        emergencyContact: data.emergencyContact === undefined
          ? undefined
          : data.emergencyContact || null,
      })
      .where(eq(users.id, userId))
      .returning();
    if (!updated) throw new Error("User not found");
    return updated;
  }

  async updateUserPassword(userId: string, password: string): Promise<User> {
    const [updated] = await db.update(users)
      .set({ password })
      .where(eq(users.id, userId))
      .returning();
    if (!updated) throw new Error("User not found");
    return updated;
  }

  async updateUserStripeCustomerId(userId: string, stripeCustomerId: string): Promise<User> {
    const [updated] = await db.update(users)
      .set({ stripeCustomerId })
      .where(eq(users.id, userId))
      .returning();
    if (!updated) throw new Error("User not found");
    return updated;
  }

  async updateUserEnrollment(userId: string, programName: string): Promise<User> {
    const [updated] = await db.update(users)
      .set({ enrolledProgram: programName, enrolledAt: new Date() })
      .where(eq(users.id, userId))
      .returning();
    if (!updated) throw new Error("User not found");
    return updated;
  }

  async getRegistrations(): Promise<Registration[]> {
    return db.select().from(registrationsTable).orderBy(desc(registrationsTable.date));
  }

  async getRegistration(id: string): Promise<Registration | undefined> {
    const [registration] = await db.select()
      .from(registrationsTable)
      .where(eq(registrationsTable.id, id))
      .limit(1);
    return registration;
  }

  async createRegistration(data: InsertRegistration): Promise<Registration> {
    const [registration] = await db.insert(registrationsTable).values({
      name: data.name,
      program: data.program,
      status: data.status ?? "Pending",
      payment: data.payment ?? "Unpaid",
      date: data.date,
      notes: data.notes ?? null,
      userId: data.userId ?? null,
      playerFirstName: data.playerFirstName ?? null,
      playerLastName: data.playerLastName ?? null,
      playerDob: data.playerDob ?? null,
      playerGender: data.playerGender ?? null,
      medicalNotes: data.medicalNotes ?? null,
      parentFirstName: data.parentFirstName ?? null,
      parentLastName: data.parentLastName ?? null,
      parentEmail: data.parentEmail ?? null,
      parentPhone: data.parentPhone ?? null,
      parentAddress: data.parentAddress ?? null,
    }).returning();
    return registration;
  }

  async updateRegistration(id: string, data: UpdateRegistration): Promise<Registration> {
    const [updated] = await db.update(registrationsTable)
      .set({
        name: data.name,
        program: data.program,
        status: data.status,
        payment: data.payment,
        date: data.date,
        notes: data.notes === undefined ? undefined : data.notes || null,
        userId: data.userId === undefined ? undefined : data.userId || null,
        playerFirstName: data.playerFirstName === undefined ? undefined : data.playerFirstName || null,
        playerLastName: data.playerLastName === undefined ? undefined : data.playerLastName || null,
        playerDob: data.playerDob === undefined ? undefined : data.playerDob || null,
        playerGender: data.playerGender === undefined ? undefined : data.playerGender || null,
        medicalNotes: data.medicalNotes === undefined ? undefined : data.medicalNotes || null,
        parentFirstName: data.parentFirstName === undefined ? undefined : data.parentFirstName || null,
        parentLastName: data.parentLastName === undefined ? undefined : data.parentLastName || null,
        parentEmail: data.parentEmail === undefined ? undefined : data.parentEmail || null,
        parentPhone: data.parentPhone === undefined ? undefined : data.parentPhone || null,
        parentAddress: data.parentAddress === undefined ? undefined : data.parentAddress || null,
      })
      .where(eq(registrationsTable.id, id))
      .returning();
    if (!updated) throw new Error("Registration not found");
    return updated;
  }

  async deleteRegistration(id: string): Promise<void> {
    const deleted = await db.delete(registrationsTable)
      .where(eq(registrationsTable.id, id))
      .returning({ id: registrationsTable.id });
    if (deleted.length === 0) throw new Error("Registration not found");
  }
}

export const storage = new DatabaseStorage();