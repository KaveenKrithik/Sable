import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const RegisterSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export const CreateProjectSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  organizationId: z.string().uuid(),
});

export const CreateQueueSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  projectId: z.string().uuid(),
  concurrencyLimit: z.number().min(1).max(100).default(10),
});

export const EnqueueJobSchema = z.object({
  name: z.string().min(2),
  payload: z.any(),
  queueId: z.string().uuid(),
  runAt: z.string().datetime().optional(),
  priority: z.number().int().default(0),
});
