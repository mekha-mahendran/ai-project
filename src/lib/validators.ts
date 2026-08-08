import { z } from "zod";

export const clientSchema = z.object({
  name: z.string().min(2, "Client name is required"),
  company: z.string().min(2, "Company is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  notes: z.string().optional(),
  status: z.enum(["ACTIVE", "LEAD", "INACTIVE"]),
});

export const projectSchema = z.object({
  name: z.string().min(2, "Project name is required"),
  description: z.string().optional(),
  clientId: z.string().optional(),
  dueDate: z.string().optional(),
  status: z.enum(["ACTIVE", "COMPLETED", "ARCHIVED"]),
});

export const taskSchema = z.object({
  title: z.string().min(2, "Task title is required"),
  projectId: z.string().min(1),
  priority: z.enum(["High", "Medium", "Low"]),
  dueDate: z.string().optional(),
});

export const deliverableSchema = z.object({
  title: z.string().min(2, "Title is required"),
  content: z.string().optional(),
  type: z.enum(["PROPOSAL", "EMAIL", "SUMMARY", "DOCUMENT", "OTHER"]),
  status: z.enum(["DRAFT", "IN_REVIEW", "APPROVED"]),
});

export const aiProposalSchema = z.object({
  clientName: z.string().min(2),
  projectName: z.string().min(2),
  services: z.string().min(10),
  budget: z.string().min(2),
  timeline: z.string().min(2),
  details: z.string().optional(),
});

export const aiEmailSchema = z.object({
  recipient: z.string().min(2),
  purpose: z.string().min(5),
  context: z.string().min(10),
  tone: z.string().min(3),
});

export const aiSummarySchema = z.object({
  text: z.string().min(10),
});
