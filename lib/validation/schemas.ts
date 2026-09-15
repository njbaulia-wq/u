import { z } from 'zod';

export const listRowSchema = z.object({
  id: z.string().min(1).max(120),
  sequence: z.string().min(1).max(20),
  name: z.string().max(500),
  statusId: z.string().max(120).optional(),
  note: z.string().max(500).optional(),
});

export const statusSchema = z.object({
  id: z.string().min(1).max(120),
  label: z.string().min(1).max(120),
  emoji: z.string().max(12),
});

export const listDefinitionSchema = z.object({
  id: z.string().min(1).max(120),
  title: z.string().max(300),
  intro: z.string().max(1000).optional(),
  columns: z.array(z.string().min(1).max(120)).max(12),
  rows: z.array(listRowSchema).max(1000),
  statuses: z.array(statusSchema).max(20),
  footer: z.string().max(1000).optional(),
});

export const parseRequestSchema = z.object({
  text: z.string().min(1).max(50_000),
});
