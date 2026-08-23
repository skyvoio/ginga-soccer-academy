import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").notNull().default(false),
  email: text("email"),
  name: text("name"),
  phone: text("phone"),
  emergencyContact: text("emergency_contact"),
  stripeCustomerId: text("stripe_customer_id"),
  enrolledProgram: text("enrolled_program"),
  enrolledAt: timestamp("enrolled_at"),
});

export const registrations = pgTable("registrations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  program: text("program").notNull(),
  status: text("status").notNull().default("Pending"),
  payment: text("payment").notNull().default("Unpaid"),
  date: text("date").notNull(),
  notes: text("notes"),
  userId: varchar("user_id"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  isAdmin: true,
});

export const updateProfileSchema = z.object({
  name: z.string().max(80).optional(),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().max(30).optional(),
  emergencyContact: z.string().max(120).optional(),
});

export const insertRegistrationSchema = z.object({
  name: z.string().min(1).max(100),
  program: z.string().min(1).max(100),
  status: z.enum(["Pending", "Confirmed"]).default("Pending"),
  payment: z.enum(["Unpaid", "Paid"]).default("Unpaid"),
  date: z.string().min(1),
  notes: z.string().max(500).optional(),
  userId: z.string().optional(),
});

export const updateRegistrationSchema = insertRegistrationSchema.partial();

export const contactMessageSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email(),
  subject: z.string().trim().max(150).optional().default("General inquiry"),
  message: z.string().trim().min(1).max(5000),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type UpdateProfile = z.infer<typeof updateProfileSchema>;
export type InsertRegistration = z.infer<typeof insertRegistrationSchema>;
export type UpdateRegistration = z.infer<typeof updateRegistrationSchema>;
export type ContactMessage = z.infer<typeof contactMessageSchema>;
export type User = typeof users.$inferSelect;
export type Registration = typeof registrations.$inferSelect;
