import { Router } from "express";

import * as reminderController from "../controllers/reminderController";
import authenticateToken from "../middlewares/authMiddleware";

const router = Router();

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
 *                 example: Buy groceries
 *               description:
 *                 type: string
 *                 example: Don't forget to buy milk and bread
 *               due_date:
 *                 type: string
 *                 format: date-time
 *                 example: 2023-12-31T23:59:59Z
 *     responses:
 *       201:
 *         description: Reminder created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reminder'
 *       500:
 *         description: Internal Server Error
 */
router.post("/create", authenticateToken, reminderController.createReminder);

/**
 * @swagger
 * /api/v1/reminders/edit/{id}:
 *   put:
 *     summary: Edit a reminder
 *     tags: [Reminders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Reminder ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Buy groceries
 *               description:
 *                 type: string
 *                 example: Don't forget to buy milk and bread
 *               due_date:
 *                 type: string
 *                 format: date-time
 *                 example: 2023-12-31T23:59:59Z
 *     responses:
 *       200:
 *         description: Reminder updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reminder'
 *       500:
 *         description: Internal Server Error
 */
router.put("/edit/:id", authenticateToken, reminderController.editReminder);

/**
 * @swagger
 * /api/v1/reminders/emergent/{id}:
 *   patch:
 *     summary: Toggle emergent status of a reminder
 *     tags: [Reminders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Reminder ID
 *     responses:
 *       200:
 *         description: Reminder emergent status toggled successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reminder'
 *       500:
 *         description: Internal Server Error
 */
router.patch("/emergent/:id/", authenticateToken, reminderController.markAsEmergent);


/**
 * @swagger
 * /api/v1/reminders/favorite/{id}:
 *   patch:
 *     summary: Toggle favorite status of a reminder
 *     tags: [Reminders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Reminder ID
 *     responses:
 *       200:
 *         description: Reminder favorite status toggled successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reminder'
 *       500:
 *         description: Internal Server Error
 */
router.patch('/favorite/:id', authenticateToken, reminderController.markAsFavorite);


/**
 * @swagger
 * /api/v1/reminders/delete/:id:
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
 *         description: Reminder ID
 *     responses:
 *       200:
 *         description: Reminder deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reminder'
 *       500:
 *         description: Internal Server Error
 */
router.delete('/delete/:id/', authenticateToken, reminderController.deleteReminder);


/**
 * @swagger
 * /api/v1/reminders/:
 *   get:
 *     summary: Get all reminders for a user
 *     tags: [Reminders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of reminders for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reminder'
 *       500:
 *         description: Internal Server Error
 */
router.get('/', authenticateToken, reminderController.getAllReminderForUser);



/**
 * @swagger
 * /api/v1/reminders/{id}:
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
 *         description: Reminder ID
 *     responses:
 *       200:
 *         description: Reminder details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reminder'
 *       500:
 *         description: Internal Server Error
 */
router.get('/:id', authenticateToken, reminderController.getSingleReminder);


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
 *         description: Filter by due date
 *       - in: query
 *         name: isEmergent
 *         schema:
 *           type: boolean
 *         description: Filter by emergent status
 *       - in: query
 *         name: isFavorite
 *         schema:
 *           type: boolean
 *         description: Filter by favorite status
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort by field (e.g., due_date, isEmergent, isFavorite)
 *       - in: query
 *         name: order
 *         schema:
 *           type: integer
 *           enum: [1, -1]
 *         description: Sort order (1 for ascending, -1 for descending)
 *     responses:
 *       200:
 *         description: Filtered and sorted reminders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reminder'
 *       500:
 *         description: Internal Server Error
 */
router.get('/filter-sort', authenticateToken, reminderController.filterAndSortReminders);

export default router;