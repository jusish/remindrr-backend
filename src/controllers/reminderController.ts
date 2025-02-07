import { Response } from "express";
import reminderService from "../services/reminderService";
import AuthRequest from "../interfaces/authRequest";

export const createReminder = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const reminder = await reminderService.createReminder(userId, req.body);
    res.status(201).json(reminder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const editReminder = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const reminderId = req.params.id;
    const reminder = await reminderService.editReminder(
      userId,
      reminderId,
      req.body
    );
    res.status(200).json(reminder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const markAsEmergent = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const reminderId = req.params.id;
    const reminder = await reminderService.toggleEmergent(userId, reminderId);
    res.status(200).json(reminder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const markAsFavorite = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const reminderId = req.params.id;
    const reminder = await reminderService.toggleFavorite(userId, reminderId);
    res.status(200).json(reminder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteReminder = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const reminderId = req.params.id;
    await reminderService.deleteReminder(userId, reminderId);
    res.sendStatus(204); // No content
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllReminderForUser = async (req: AuthRequest, res: Response) => {
  try {
      const userId = req.user?.id;
      const reminders = await reminderService.getAllRemindersForUser(userId);
      res.status(200).json(reminders);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
  }
};


export const getSingleReminder = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const reminderId = req.params.id;
    const reminder = await reminderService.getSingleReminder(
      userId,
      reminderId
    );
    res.status(200).json(reminder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const filterAndSortReminders = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const filters = req.query;
    const sortOptions = {
      sortBy: req.query.sortBy,
      order: req.query.order,
    };

    const reminders = await reminderService.filterAndSortReminders(userId, filters, sortOptions);
    res.status(200).json(reminders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
