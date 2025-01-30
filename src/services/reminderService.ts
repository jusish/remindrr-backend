import Reminder from "../models/Reminder";
import User from "../models/User";

import IReminder from "../interfaces/reminder";
import { SortOrder } from "mongoose";

// Create a new reminder

export const createReminder = async (
  userId: string,
  reminderData: Partial<IReminder>
) => {
  const reminder = new Reminder({
    ...reminderData,
    user: userId,
  });
  await reminder.save();

  // Update User's reminder array

  const user = await User.findById(userId);
  if (user) {
    user.reminders.push(reminder.id);
    await user.save();
  }

  return reminder;
};

// Edit reminders

export const editReminder = async (
  reminderId: string,
  updateData: Partial<IReminder>
) => {
  const reminder = await Reminder.findByIdAndUpdate(reminderId, updateData, {
    new: true,
  });
  if (!reminder) {
    throw new Error("Reminder not found");
  }
  return reminder;
};

// Mark as important reminder

export const markAsEmergent = async (reminderId: string) => {
  const reminder = await Reminder.findById(reminderId);
  if (!reminder) {
    throw new Error("Reminder not found");
  }

  reminder.isEmergent = !reminder.isEmergent;
  await reminder.save();

  return reminder;
};

// Mark as favorite reminder

export const markAsFavorite = async (reminderId: string) => {
  const reminder = await Reminder.findById(reminderId);
  if (!reminder) {
    throw new Error("Reminder not found");
  }

  reminder.isFavorite = !reminder.isFavorite;
  await reminder.save();

  return reminder;
};

// Delete reminder

export const deleteReminder = async (reminderId: string) => {
  const reminder = await Reminder.findByIdAndDelete(reminderId);
  if (!reminder) {
    throw new Error("Reminder not found");
  }

  const user = await User.findById(reminder.user);
  if (user) {
    user.reminders = user.reminders.filter((id) => id !== reminderId);
    await user.save();
  }

  return reminder;
};

// Get reminders per each user

export const getAllReminderForUser = async (userId: string) => {
  const reminders = await Reminder.find({ user: userId }).populate("user");
  return reminders;
};

// Get a single reminder

export const getSingleReminder = async (reminderId: string) => {
  const reminder = await Reminder.findById(reminderId).populate("user");
  if (!reminder) {
    throw new Error("Reminder not found");
  }
  return reminder;
};

// Apply filters

export const filterAndSortReminders = async (
  userId: string,
  filters: any,
  sortOptions: any
) => {
  const query: { user: string; due_date?: Date; isFavorite?: boolean } = {
    user: userId,
  };

  // Apply filters

  if (filters.due_date) query["due_date"] = filters.due_date;
  if (filters.isFavorite) query["isFavorite"] = filters.isFavorite;

  // Apply sort options

  const sort: { [key: string]: SortOrder } = {};

  if (sortOptions.sortBy) sort[sortOptions.sortBy] = sortOptions.order || 1;

  const reminders = await Reminder.find(query).sort(sort).populate("user");
  return reminders;
};

export default {
  createReminder,
  editReminder,
  markAsEmergent,
  markAsFavorite,
  deleteReminder,
  getAllReminderForUser,
  getSingleReminder,
  filterAndSortReminders,
};
