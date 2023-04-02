import { z } from 'zod';

export const ActionSchema = z.object({
  id: z.string().optional(),
  template: z.string().optional(),
  name: z.string(),
  description: z.string().optional(),
  iconUrl: z.string().optional(),
  goalType: z.enum(['binary', 'measurable']).optional(),
  goalAmount: z.number().optional(),
  goalUnit: z.string().optional(),
  goalIntervalUnit: z.string().optional(),
  reminderEnabled: z.boolean(),
  reminderIntervalType: z.string().optional(),
  reminderStartTime: z.string().optional(),
  reminderEndTime: z.string().optional(),
  reminderOnlyOnceDate: z.string().optional(),
  reminderRecurrenceIntervalUnit: z.string().optional(),
  reminderRecurrenceIntervalAmount: z.number().optional(),
  reminderRecurrenceStartsAt: z.string().optional(),
  reminderRecurrenceEndsAt: z.string().optional(),
  reminderLastExecutedAt: z.string().optional(),
  reminderNextExecutesAt: z.string().optional(),
  reminderMuteEndsAt: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type ActionType = z.infer<typeof ActionSchema>;
