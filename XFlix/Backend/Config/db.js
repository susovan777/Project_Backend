import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.configDotenv();

const mongo_db = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(mongo_db);

    console.log(`✅ MongoDB connected successfully!`);
  } catch (err) {
    console.error(`❌ MongoDB connection error: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;