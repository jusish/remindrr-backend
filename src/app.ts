import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './config/db';
import passport from 'passport';
import authRoutes from './routes/authRoutes';





dotenv.config();

const app: Application = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
require('./config/passportConfig');

// Routes

app.use('/api/v1/auth', authRoutes)



// Connect to MongoDB
connectDB();

export default app;