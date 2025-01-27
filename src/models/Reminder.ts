import mongoose from "mongoose";


const reminderSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
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
    date: {
        type: Date,
        required: true,
        default: ('2025-02-01T10:00:00')
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isFavorite: {
        type: Boolean,
        default: false
    },
    isEmergent: {
        type: Boolean,
        default: false
    }
})



const Reminder = mongoose.model('Reminder', reminderSchema);

export default Reminder;