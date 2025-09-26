require("dotenv").config(); 
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;


const startServer = async () => {
    try {
        // 1. Connect to the database
        await connectDB(); 

        // 2. Start the Express server
        const server = app.listen(PORT, () => {
            const link = `http://localhost:${PORT}`;
            console.log(`\n🚀 Server running in ${process.env.NODE_ENV || "development"} mode.`);
            console.log(`🔗 Access API at: ${link}`);
        });

        // Graceful Exit: Handle unhandled promise rejections (critical errors outside express scope)
        process.on("unhandledRejection", (err) => {
            console.error("❌ UNHANDLED REJECTION! Shutting down...");
            console.error(`Error: ${err.name}, Message: ${err.message}`);
            server.close(() => {
                process.exit(1);
            });
        });

    } catch (error) {
        console.error("❌ Critical Error during server startup:", error.message);
        process.exit(1);
    }
};

startServer();
