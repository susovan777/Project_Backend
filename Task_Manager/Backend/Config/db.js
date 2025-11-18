import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';

configDotenv();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
