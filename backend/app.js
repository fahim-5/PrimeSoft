const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const app = express();



const ApiError = require('./utils/ApiError'); 
const apiRoutes = require('./routes/apiRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');



app.use(helmet()); 
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? 'http://localhost:5173' 
        : '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}





app.get("/", (req, res) => {
    res.status(200).json({
        message: "PrimeSoft Backend API is running successfully!",
        environment: process.env.NODE_ENV || "development",
    });
});




// this will mount all my routes
app.use("/api/v1", apiRoutes);






// === 4. UNHANDLED ROUTE CATCHER (Runs BEFORE errorMiddleware) 
app.all(/(.*)/, (req, res, next) => {
    next(new ApiError(404, `Route not found: ${req.originalUrl}`));
});





app.use(errorMiddleware);


module.exports = app;
