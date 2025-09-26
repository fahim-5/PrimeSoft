const ApiError = require("../utils/ApiError");

/**
 * @description Centralized middleware to handle all application errors.
 * It ensures all errors are returned in a consistent JSON format.
 */
const errorMiddleware = (err, req, res, next) => {
    // 1. Set default status and message
    let statusCode = 500;
    let message = "Internal Server Error";

    // --- USE OF API ERROR: Check if the error is a custom operational error ---
    if (err instanceof ApiError) {
        statusCode = err.statusCode;
        message = err.message;
    } else {
        // Use the status code if it was manually assigned, otherwise default to 500
        statusCode = err.statusCode || 500;
        message = err.message || "Internal Server Error";
    }
    // --------------------------------------------------------------------------

    // 2. Handle specific known errors (e.g., Mongoose errors)
    
    // Handle Mongoose CastError (e.g., bad object ID format)
    if (err.name === 'CastError') {
        statusCode = 400;
        message = `Invalid ID format for resource: ${err.value}`;
    }

    // Handle Mongoose duplicate key error (code 11000)
    if (err.code === 11000) {
        statusCode = 400;
        // Mongoose error structure might be slightly different in newer versions
        const field = Object.keys(err.keyValue || {}).join(', ');
        message = `Duplicate value entered for ${field}. Value: ${err.keyValue ? err.keyValue[field] : ''}`;
    }

    // Handle Mongoose validation error (e.g., missing required field)
    if (err.name === 'ValidationError') {
        statusCode = 400;
        // Join all validation messages into one clean string
        const errors = Object.values(err.errors).map(el => el.message);
        message = `Data validation failed: ${errors.join('. ')}`;
    }
    
    // 3. Log the error stack in development environment
    if (process.env.NODE_ENV === "development") {
        console.error("❌ Error Stack:", err.stack);
    }

    // 4. Send the structured error response
    res.status(statusCode).json({
        success: false,
        message: message,
        // Only include the stack trace in dev mode
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined 
    });
};

module.exports = errorMiddleware;
