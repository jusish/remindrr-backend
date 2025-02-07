import mongoose, { Schema, Document, Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import IUser from "../interfaces/user";

const userSchema: Schema<IUser> = new Schema({
  id: {
    type: String,
    default: uuidv4,
    unique: true,
  },
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
});

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
