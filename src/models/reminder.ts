import mongoose, { Document, Model } from "mongoose"

import IReminder from "../interfaces/reminder";

const reminderSchema = new mongoose.Schema({
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
        type: String,
        ref: 'User',
        required: true
    },
})



const Reminder: Model<IReminder> = mongoose.model<IReminder>('Reminder', reminderSchema);

export default Reminder;