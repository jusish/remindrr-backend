import mongoose from 'mongoose';
import { config } from 'dotenv';

config(); // Load .env variables

const connectDB = async (): Promise<void> => {
  try {
    const uri = process.env.MONGO_URI as string;
    if (!uri) {
      throw new Error('MongoDB URI is not defined in .env file');
    }

    await mongoose.connect(uri);
    console.log('✅ MongoDB Connected...');
  } catch (err) {
    if (err instanceof Error) {
      console.error('❌ MongoDB Connection Failed:', err.message);
    } else {
      console.error('❌ MongoDB Connection Failed:', err);
    }
    process.exit(1);
  }
};

export default connectDB;
