import { z } from 'zod';

/**
 * [The Gatekeeper Schema]:
 * This defines exactly what a "Product" must look like.
 * It acts as the first line of defense before data touches the Controller or DB.
 */
export const productSchema = z.object({
    // Basic validation: must be a string between 2 and 100 characters
    name: z.string().min(2, "Name too short").max(100),
    
    category: z.string().min(2, "Category too short"), 

    // [The Coercion Magic]:
    // Web forms often send numbers as strings (e.g., "10.99").
    // 'z.coerce.number()' automatically tries to convert that string into a real JS Number.
    // .positive() ensures the price is greater than 0.
    price: z.coerce.number().positive(), 

    // .int() ensures no decimals (you can't have 5.5 chairs in stock).
    // .nonnegative() allows 0 (out of stock) but nothing below.
    stock: z.coerce.number().int().nonnegative() 
});

export default productSchema;