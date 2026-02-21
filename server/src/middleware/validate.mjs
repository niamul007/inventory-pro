/**
 * [The Validation Middleware]:
 * This is a Higher-Order Function that takes a Zod schema and 
 * returns a standard Express middleware.
 */
export const validate = (schema) => (req, res, next) => {
    // 1. 'safeParse' tries to validate req.body without throwing an error.
    // It returns an object: { success: true, data: ... } or { success: false, error: ... }
    const result = schema.safeParse(req.body);

    // 2. If validation fails:
    if (!result.success) {
        return res.status(400).json({
            status: "fail",
            // 3. We 'map' the complex Zod error object into a clean, 
            // simple array that our Frontend (React) can easily understand.
            errors: result.error.errors.map((err) => ({
                // path: Shows which field failed (e.g., "price")
                path: err.path.join('.'),
                // message: Shows the custom message from our schema
                message: err.message
            }))
        });
    }

    // 4. IMPORTANT: We replace req.body with 'result.data'.
    // This ensures the rest of our app uses the "cleaned" and "coerced" data 
    // (e.g., strings converted to numbers) provided by Zod.
    req.body = result.data;
    
    // 5. Move to the next middleware or controller
    next();
};