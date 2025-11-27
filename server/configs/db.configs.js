import mongoose from "mongoose";

export const connectDB = async (mongoURI) => {
  try {
    const response = await mongoose.connect(mongoURI);
    if (response) {
      console.log("MongoDB connected successfully");
    } else {
      console.log("MongoDB connection failed");
    }
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
