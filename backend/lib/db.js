import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (e) {
    console.log(`Error connecting to mongoDB ${e.message}`);
    process.exit(1);
  }
};
