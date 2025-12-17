import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.configDotenv();

const mongo_db = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(mongo_db);

    console.log(`✅ MongoDB connected successfully!`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;