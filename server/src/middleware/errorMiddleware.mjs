/**
 * [The Global Error Hospital]:
 * This is a special Express middleware with 4 arguments (err, req, res, next).
 * Express knows that if a middleware has 4 arguments, it is the designated 
 * Error Handler for the entire application.
 */
export const globalErrorHandle = (err, req, res, next) => {
    
    // 1. SET DEFAULTS: 
    // If the error doesn't have a statusCode (like a random code crash), 
    // we default to 500 (Internal Server Error).
    err.statusCode = err.statusCode || 500;

    // 2. SET STATUS:
    // If no status is defined, we call it 'error'. 
    // (Recall: AppError usually sets this to 'fail' for 400-series errors).
    err.status = err.status || 'error';

    // 3. THE FINAL RESPONSE:
    // We send a consistent JSON object back to the client.
    // This ensures that whether it's a validation error or a server crash,
    // the Frontend always receives the same data structure.
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
};

export default globalErrorHandle;