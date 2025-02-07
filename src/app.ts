import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import errorHandler from "./middlewares/errorHandler";
import cookieParser from "cookie-parser";

import swaggerUi from "swagger-ui-express";
import specs from "./swagger";

import reminderRoutes from "./routes/reminderRoutes";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/reminders", reminderRoutes);

// Error handling middleware
app.use(errorHandler);

// Connect to MongoDB
connectDB();

export default app;
