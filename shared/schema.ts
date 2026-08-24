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
  // Player info
  playerFirstName: text("player_first_name"),
  playerLastName: text("player_last_name"),
  playerDob: text("player_dob"),
  playerGender: text("player_gender"),
  // Medical
  medicalNotes: text("medical_notes"),
  // Parent / guardian info
  parentFirstName: text("parent_first_name"),
  parentLastName: text("parent_last_name"),
  parentEmail: text("parent_email"),
  parentPhone: text("parent_phone"),
  parentAddress: text("parent_address"),
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

// Base schema used by admin routes (all new fields optional for backward-compat)
export const insertRegistrationSchema = z.object({
  name: z.string().min(1).max(100),
  program: z.string().min(1).max(100),
  status: z.enum(["Pending", "Confirmed"]).default("Pending"),
  payment: z.enum(["Unpaid", "Paid"]).default("Unpaid"),
  date: z.string().min(1),
  notes: z.string().max(500).optional(),
  userId: z.string().optional(),
  // Extended player fields (optional for admin-created entries)
  playerFirstName: z.string().trim().max(80).optional(),
  playerLastName: z.string().trim().max(80).optional(),
  playerDob: z.string().optional(),
  playerGender: z.string().max(20).optional(),
  medicalNotes: z.string().max(1000).optional(),
  parentFirstName: z.string().trim().max(80).optional(),
  parentLastName: z.string().trim().max(80).optional(),
  parentEmail: z.string().email().optional().or(z.literal("")),
  parentPhone: z.string().max(30).optional(),
  parentAddress: z.string().max(200).optional(),
});

export const updateRegistrationSchema = insertRegistrationSchema.partial();

// Strict schema used by the user-facing digital registration form
export const digitalRegistrationSchema = z.object({
  program: z.string().min(1).max(100),
  // Player
  playerFirstName: z.string().trim().min(1, "First name is required").max(80),
  playerLastName: z.string().trim().min(1, "Last name is required").max(80),
  playerDob: z.string().min(1, "Date of birth is required"),
  playerGender: z.string().min(1, "Gender is required").max(20),
  // Medical (optional)
  medicalNotes: z.string().max(1000).optional(),
  // Parent / guardian
  parentFirstName: z.string().trim().min(1, "Parent first name is required").max(80),
  parentLastName: z.string().trim().min(1, "Parent last name is required").max(80),
  parentEmail: z.string().trim().email("Valid email required"),
  parentPhone: z.string().trim().min(7, "Phone number required").max(30),
  parentAddress: z.string().trim().min(1, "Home address is required").max(200),
});

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
export type DigitalRegistration = z.infer<typeof digitalRegistrationSchema>;
export type ContactMessage = z.infer<typeof contactMessageSchema>;
export type User = typeof users.$inferSelect;
export type Registration = typeof registrations.$inferSelect;
