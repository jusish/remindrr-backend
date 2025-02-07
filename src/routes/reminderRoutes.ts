import { Router } from "express";
import * as reminderController from "../controllers/reminderController";
import authenticateToken from "../middlewares/authMiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Reminders
 *   description: Reminder management
 */

/**
 * @swagger
 * /api/v1/reminders/create:
 *   post:
 *     summary: Create a new reminder
 *     tags: [Reminders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               due_date:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-02-01T10:00:00Z"
 *     responses:
 *       201:
 *         description: Reminder created successfully
 */
router.post("/create", authenticateToken, reminderController.createReminder);

/**
 * @swagger
 * /api/v1/reminders/edit/{id}:
 *   put:
 *     summary: Edit an existing reminder
 *     tags: [Reminders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               due_date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Reminder updated successfully
 */
router.put("/edit/:id", authenticateToken, reminderController.editReminder);

/**
 * @swagger
 * /api/v1/reminders/emergent/{id}:
 *   patch:
 *     summary: Mark a reminder as emergent
 *     tags: [Reminders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reminder marked as emergent
 */
router.patch("/emergent/:id/", authenticateToken, reminderController.markAsEmergent);

/**
 * @swagger
 * /api/v1/reminders/favorite/{id}:
 *   patch:
 *     summary: Mark a reminder as favorite
 *     tags: [Reminders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reminder marked as favorite
 */
router.patch("/favorite/:id", authenticateToken, reminderController.markAsFavorite);

/**
 * @swagger
 * /api/v1/reminders/delete/{id}:
 *   delete:
 *     summary: Delete a reminder
 *     tags: [Reminders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reminder deleted successfully
 */
router.delete("/delete/:id/", authenticateToken, reminderController.deleteReminder);

/**
 * @swagger
 * /api/v1/reminders:
 *   get:
 *     summary: Get all reminders for a user
 *     tags: [Reminders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of reminders
 */
router.get("/", authenticateToken, reminderController.getAllReminderForUser);

/**
 * @swagger
 * /api/v1/reminders/by-id/{id}:
 *   get:
 *     summary: Get a single reminder by ID
 *     tags: [Reminders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reminder details
 */
router.get("/by-id/:id", authenticateToken, reminderController.getSingleReminder);

/**
 * @swagger
 * /api/v1/reminders/filter-sort:
 *   get:
 *     summary: Filter and sort reminders
 *     tags: [Reminders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: due_date
 *         schema:
 *           type: string
 *           format: date-time
 *       - in: query
 *         name: isFavorite
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *     responses:
 *       200:
 *         description: List of filtered and sorted reminders
 */
router.get("/filter-sort", authenticateToken, reminderController.filterAndSortReminders);

export default router;
