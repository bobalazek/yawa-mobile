import { z } from 'zod';

export const ActionSchema = z.object({
  id: z.string().optional(),
  template: z.string().optional(),
  name: z.string(),
  description: z.string().optional(),
  iconUrl: z.string().optional(),
  goalType: z.enum(['binary', 'measurable']).optional(),
  goalAmount: z.number().min(1).max(1000).optional(),
  goalUnit: z.string().max(24).optional(),
  goalIntervalUnit: z.enum(['day', 'week', 'month', 'year']).optional(),
  reminderEnabled: z.boolean(),
  reminderIntervalType: z.enum(['only_once', 'recurring_every_x_y', 'recurring_x_times_per_y']).optional(),
  reminderStartTime: z.string().optional(),
  reminderEndTime: z.string().optional(),
  reminderOnlyOnceDate: z.string().optional(),
  reminderRecurrenceIntervalUnit: z.enum(['minute', 'hour', 'day', 'week', 'month', 'year']).optional(),
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
