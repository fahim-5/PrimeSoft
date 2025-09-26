require("dotenv").config(); // Load .env first
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB(); // Connect to MongoDB first

    app.listen(PORT, () => {
      const link = `http://localhost:${PORT}`;
      console.log(`🚀 Backend server running in ${process.env.NODE_ENV || "development"} mode`);
      console.log(`🔗 Click to open: ${link}`);
    });
  } catch (error) {
    console.error("❌ Error starting server:", error.message);
    process.exit(1);
  }
};

startServer();
