const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI not defined in .env");
    }

    // Modern, warning-free connection
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ Connected to MongoDB database");
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
