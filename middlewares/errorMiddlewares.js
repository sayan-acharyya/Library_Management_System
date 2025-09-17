class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}   

export const errorMiddleware = (err, req, res, next) => {
    let customError = { ...err };
    customError.message = err.message || "Internal Server Error";
    customError.statusCode = err.statusCode || 500;

    // Handle Mongoose Duplicate Key Error
    if (err.code === 11000) {
        const message = "Duplicate Field Value Entered";
        customError = new ErrorHandler(message, 400);
    }

    // Handle Invalid JWT
    if (err.name === "JsonWebTokenError") {
        const message = "Json Web Token is invalid. Try again.";
        customError = new ErrorHandler(message, 400);
    }

    // Handle Expired JWT
    if (err.name === "TokenExpiredError") {
        const message = "Json Web Token has expired. Please login again.";
        customError = new ErrorHandler(message, 400);
    }

    // Handle Mongoose Cast Error (Invalid ObjectId, etc.)
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid ${err.path}`;
        customError = new ErrorHandler(message, 400);
    }

    const errorMessage = customError.errors
        ? Object.values(customError.errors).map(error => error.message).join(" ")
        : customError.message;

    return res.status(customError.statusCode).json({
        success: false,
        message: errorMessage,
    });
};

export default ErrorHandler;
