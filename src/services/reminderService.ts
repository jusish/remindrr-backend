import Reminder from "../models/reminder";
import mongoose, { SortOrder } from "mongoose";
import IReminder from "../interfaces/reminder";

// Create a new reminder
export const createReminder = async (
  userId: string,
  reminderData: Partial<IReminder>
) => {
  try {
    const reminder = new Reminder({ ...reminderData, user: userId });
    await reminder.save();
    return reminder;
  } catch (error) {
    throw new Error(`Error creating reminder: ${(error as any).message}`);
  }
};

// Edit a reminder (only if it belongs to the user)
export const editReminder = async (
  userId: string,
  reminderId: string,
  updateData: Partial<IReminder>
) => {
  const reminder = await Reminder.findOneAndUpdate(
    { _id: reminderId, user: userId }, // Ensure the user owns the reminder
    updateData,
    { new: true }
  );
  if (!reminder) throw new Error("Reminder not found or unauthorized");
  return reminder;
};

// Toggle emergent status (only if it belongs to the user)
export const toggleEmergent = async (userId: string, reminderId: string) => {
  const reminder = await Reminder.findOne({ _id: reminderId, user: userId });
  if (!reminder) throw new Error("Reminder not found or unauthorized");

  reminder.isEmergent = !reminder.isEmergent;
  await reminder.save();
  return reminder;
};

// Toggle favorite status (only if it belongs to the user)
export const toggleFavorite = async (userId: string, reminderId: string) => {
  const reminder = await Reminder.findOne({ _id: reminderId, user: userId });
  if (!reminder) throw new Error("Reminder not found or unauthorized");

  reminder.isFavorite = !reminder.isFavorite;
  await reminder.save();
  return reminder;
};

// Delete a reminder (only if it belongs to the user)
export const deleteReminder = async (userId: string, reminderId: string) => {
  const reminder = await Reminder.findOneAndDelete({
    _id: reminderId,
    user: userId,
  });
  if (!reminder) throw new Error("Reminder not found or unauthorized");
  return reminder;
};

/// Get reminders for a specific user
export const getAllRemindersForUser = async (userId: string) => {
  const reminders = await Reminder.find({ user: userId }).lean();

  return reminders.map((reminder) => ({
    ...reminder,
    remainingTime: calculateRemainingTime(reminder.due_date),
  }));
};

// Function to calculate remaining time
const calculateRemainingTime = (dueDate: Date) => {
  const now = new Date();
  const diffMs = new Date(dueDate).getTime() - now.getTime();

  if (diffMs <= 0) return "Expired";

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  return `${days}d ${hours}h ${minutes}m`;
};

// Get a single reminder (only if it belongs to the user)
export const getSingleReminder = async (userId: string, reminderId: string) => {
  const reminder = await Reminder.findOne({
    _id: reminderId,
    user: userId,
  }).lean();

  if (!reminder) throw new Error("Reminder not found or unauthorized");

  // Add remainingTime dynamically without modifying the model
  const reminderWithRemainingTime: any = reminder; // Cast to any to allow adding new properties
  reminderWithRemainingTime.remainingTime = calculateRemainingTime(
    reminder.due_date
  );

  return reminderWithRemainingTime;
};

export const filterAndSortReminders = async (
  userId: string,
  filters: any,
  sortOptions: any
) => {
  const query: any = { user: userId };

  // ✅ Convert `isEmergent` and `isFavorite` to Boolean filters if provided
  if (filters.isEmergent !== undefined) {
    query.isEmergent = filters.isEmergent === "true"; // Ensures boolean value
  }
  if (filters.isFavorite !== undefined) {
    query.isFavorite = filters.isFavorite === "true"; // Ensures boolean value
  }

  // ✅ Filter by due_date if provided
  if (filters.due_date) {
    query.due_date = { $gte: new Date(filters.due_date) };
  }

  // Fetch reminders based on the query (without sorting)
  const reminders = await Reminder.find(query).lean();

  // Map through reminders to calculate remaining time in milliseconds
  const remindersWithRemainingTime = reminders.map((reminder) => ({
    ...reminder,
    remainingTimeMs:
      new Date(reminder.due_date).getTime() - new Date().getTime(),
  }));

  // Sort reminders based on the remaining time in ascending or descending order
  const sortedReminders = remindersWithRemainingTime.sort((a, b) => {
    const compareValue = a.remainingTimeMs - b.remainingTimeMs;
    return sortOptions.order === "desc" ? -compareValue : compareValue;
  });

  // Map again to add human-readable remaining time
  return sortedReminders.map((reminder) => ({
    ...reminder,
    remainingTime: calculateRemainingTime(reminder.due_date),
  }));
};

export default {
  createReminder,
  editReminder,
  toggleEmergent,
  toggleFavorite,
  deleteReminder,
  getAllRemindersForUser,
  getSingleReminder,
  filterAndSortReminders,
};
