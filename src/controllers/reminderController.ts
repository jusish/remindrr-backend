import { Request, Response } from "express";

import reminderService from "../services/reminderService";
import AuthRequest from "../interfaces/authRequest";

export const createReminder = async (req: AuthRequest, res: Response) => {
  console.log("Decoded User:", req.user); // Debugging

  try {
    const userId = req.user?.id;
    const reminder = await reminderService.createReminder(userId, req.body);
    res.status(201).json(reminder);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const editReminder = async (req: Request, res: Response) => {
  try {
    const reminderId = req.params.id;
    const reminder = await reminderService.editReminder(reminderId, req.body);
    res.status(200).json(reminder);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const markAsEmergent = async (req: Request, res: Response) => {
  try {
    const reminderId = req.params.id;
    const reminder = await reminderService.toggleEmergent(reminderId);
    res.status(200).json(reminder);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const markAsFavorite = async (req: Request, res: Response) => {
  try {
    const reminderId = req.params.id;
    const reminder = await reminderService.toggleFavorite(reminderId);
    res.status(200).json(reminder);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteReminder = async (req: Request, res: Response) => {
  try {
    const reminderId = req.params.id;
    await reminderService.deleteReminder(reminderId);
    res.sendStatus(204); // No content
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllReminderForUser = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user?.id;
    const reminders = await reminderService.getAllRemindersForUser(userId);
    res.status(200).json(reminders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSingleReminder = async (req: Request, res: Response) => {
  try {
    const reminderId = req.params.id;
    const reminder = await reminderService.getSingleReminder(reminderId);
    res.status(200).json(reminder);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const filterAndSortReminders = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    console.log("herrr")
    console.log(req.body)
    console.log(req.query)
    const userId = req.user?.id;
    const filters = req.query;
    const sortOptions = req.query;

    const reminders = await reminderService.filterAndSortReminders(
      userId,
      filters,
      sortOptions
    );
    res.status(200).json(reminders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
