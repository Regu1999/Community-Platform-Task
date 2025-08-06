import mongoose from "mongoose";

const DB_CONNECTION_URI = process.env.DB_CONNECTION_URI;

const connectDb = async () => {
  try {
    if (!DB_CONNECTION_URI) {
      throw new Error("❌ DB_CONNECTION_URI is missing in environment variables!");
    }

    await mongoose.connect(DB_CONNECTION_URI, {
      serverSelectionTimeoutMS: 5000, // fail fast if cannot connect
    });

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); // Exit process to prevent unhandled rejection on Vercel
  }
};

export default connectDb;
