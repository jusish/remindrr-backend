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

// Get reminders for a specific user
export const getAllRemindersForUser = async (userId: string) => {
  return await Reminder.find({ user: userId }).lean();
};

// Get a single reminder (only if it belongs to the user)
export const getSingleReminder = async (userId: string, reminderId: string) => {
  const reminder = await Reminder.findOne({
    _id: reminderId,
    user: userId,
  }).lean();
  if (!reminder) throw new Error("Reminder not found or unauthorized");
  return reminder;
};

// Filter & Sort reminders (only for the authenticated user)
export const filterAndSortReminders = async (
  userId: mongoose.Types.ObjectId,
  filters: any,
  sortOptions: any
) => {
  console.log("here");
  const query: any = { user: userId };

  if (filters.due_date) query.due_date = { $gte: new Date(filters.due_date) };
  if (filters.isFavorite !== undefined)
    query.isFavorite = Boolean(filters.isFavorite);

  const sort: { [key: string]: SortOrder } = {};
  if (sortOptions.sortBy) {
    sort[sortOptions.sortBy] = sortOptions.order === "desc" ? -1 : 1;
  } else {
    sort["createdAt"] = -1; // Default sorting by newest first
  }
  return await Reminder.find(query).sort(sort).lean();
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
