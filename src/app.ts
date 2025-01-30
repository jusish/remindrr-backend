import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import errorHandler from "./middlewares/errorHandler";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes

app.use("/api/v1/auth", authRoutes);

// Error handling middleware

app.use(errorHandler);

// Connect to MongoDB
connectDB();

export default app;
