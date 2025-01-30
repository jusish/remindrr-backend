import mongoose, { Schema, Document, Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

interface IUser extends Document {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
    refresh_tokens: string[];
    reminders: string[];
}

const userSchema: Schema<IUser> = new Schema({
    first_name: {
        type: String,
        required: true,
        unique: false,
    },
    last_name: {
        type: String,
        required: true,
        unique: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: false,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    refresh_tokens: [{ type: String }],
    reminders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Reminder",
        },
    ],
});

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
export { IUser };
