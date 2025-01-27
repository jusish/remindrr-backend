import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from 'uuid';


const userSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        required: true,
        unique: true
    },
    first_name: {
        type: String,
        required: true,
        unique: false
    },
    last_name: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: false
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    reminders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reminder'
    }]
});

const User = mongoose.model('User', userSchema);

export default User;
