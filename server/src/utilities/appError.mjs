/**
 * [The Custom Error Blueprint]:
 * We extend the built-in JavaScript Error class so we can add 
 * specific web-related information (like HTTP Status Codes).
 */
class AppError extends Error {
    constructor(message, statusCode) {
        // 1. Call the parent Error constructor with the message
        super(message);

        // 2. Attach the HTTP Status Code (e.g., 404, 400, 500)
        this.statusCode = statusCode;

        // 3. Automatically determine the 'status' string:
        // If code starts with '4' (e.g. 404), it's a "fail" (Client's fault)
        // If it starts with '5' (e.g. 500), it's an "error" (Server's fault)
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

        // 4. Mark as 'Operational':
        // This helps the Global Handler distinguish between "Known Errors" 
        // (like wrong password) and "Bugs" (like typos in code).
        this.isOperational = true;

        // 5. Clean up the Stack Trace:
        // This prevents this specific Class file from cluttering the error log, 
        // showing you exactly where the error actually happened in your logic.
        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;