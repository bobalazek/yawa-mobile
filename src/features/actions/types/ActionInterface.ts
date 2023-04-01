export class ActionInterface {
  id?: string;
  template?: string;
  name!: string;
  description?: string;
  iconUrl?: string;
  // Goal
  goalType?: string;
  goalAmount?: number;
  goalUnit?: string;
  goalIntervalUnit?: string;
  // Reminder
  reminderEnabled!: boolean;
  reminderIntervalType?: string;
  reminderStartTime?: string;
  reminderEndTime?: string;
  reminderOnlyOnceDate?: string;
  reminderRecurrenceIntervalUnit?: string;
  reminderRecurrenceIntervalAmount?: number;
  reminderRecurrenceStartsAt?: Date;
  reminderRecurrenceEndsAt?: Date;
  reminderLastExecutedAt?: Date;
  reminderNextExecutesAt?: Date;
  reminderMuteEndsAt?: Date;
  createdAt!: Date;
  updatedAt!: Date;
}
