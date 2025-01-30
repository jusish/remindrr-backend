import mongoose, { Document, Model } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

import IReminder from "../interfaces/reminder";

const reminderSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    due_date: {
        type: Date,
        required: true,
        default: ('2025-02-01T10:00:00')
    },
    isFavorite: {
        type: Boolean,
        default: false
    },
    isEmergent: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
})



const Reminder: Model<IReminder> = mongoose.model<IReminder>('Reminder', reminderSchema);

export default Reminder;