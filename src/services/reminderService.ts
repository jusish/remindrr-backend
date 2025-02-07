import Reminder from "../models/reminder";
import { SortOrder } from "mongoose";
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

// Edit reminders
export const editReminder = async (
  reminderId: string,
  updateData: Partial<IReminder>
) => {
  const reminder = await Reminder.findByIdAndUpdate(reminderId, updateData, {
    new: true,
  });
  if (!reminder) throw new Error("Reminder not found");
  return reminder;
};

// Toggle emergent status
export const toggleEmergent = async (reminderId: string) => {
  const reminder = await Reminder.findById(reminderId);
  if (!reminder) throw new Error("Reminder not found");

  reminder.isEmergent = !reminder.isEmergent;
  await reminder.save();
  return reminder;
};

// Toggle favorite status
export const toggleFavorite = async (reminderId: string) => {
  const reminder = await Reminder.findById(reminderId);
  if (!reminder) throw new Error("Reminder not found");

  reminder.isFavorite = !reminder.isFavorite;
  await reminder.save();
  return reminder;
};

// Delete reminder
export const deleteReminder = async (reminderId: string) => {
  const reminder = await Reminder.findByIdAndDelete(reminderId);
  if (!reminder) throw new Error("Reminder not found");
  return reminder;
};

// Get reminders for a user
export const getAllRemindersForUser = async (userId: string) => {
  return await Reminder.find({ user: userId }).lean();
};

// Get a single reminder
export const getSingleReminder = async (reminderId: string) => {
  const reminder = await Reminder.findById(reminderId).lean();
  if (!reminder) throw new Error("Reminder not found");
  return reminder;
};

// Filter & Sort reminders
export const filterAndSortReminders = async (
  userId: string,
  filters: any,
  sortOptions: any
) => {
  const query: any = { user: userId };

  if (filters.due_date) query.due_date = new Date(filters.due_date);
  if (filters.isFavorite !== undefined)
    query.isFavorite = Boolean(filters.isFavorite);

  const sort: { [key: string]: SortOrder } = {};
  if (sortOptions.sortBy)
    sort[sortOptions.sortBy] = sortOptions.order === "desc" ? -1 : 1;

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
