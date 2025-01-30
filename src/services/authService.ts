import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User";
import { IUser } from "../models/User";

export const register = async (userData: Partial<IUser>) => {
  const { first_name, last_name, email, password, phone } = userData;

  if (!password) {
    throw new Error("Password is required");
  }

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return { message: "User already exists" };
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Creating new user

  const user = new User({
    first_name,
    last_name,
    email,
    password: hashedPassword,
    phone,
  });
  await user.save();

  return user;
};


export const login = async (credentials: { email: string, password: string }) => {
    const {email, password} = credentials;


    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return { message: "Invalid credentials" };
    }

    // Compare password

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { message: "Invalid credentials" };
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || '', {
        expiresIn: '1h'
    });

    return token;
}


export default { register, login };