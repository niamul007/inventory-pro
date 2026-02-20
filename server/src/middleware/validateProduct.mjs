import { z } from 'zod';

export const productSchema = z.object({
    name: z.string().min(2, "Name too short").max(100),
    category: z.string().min(2, "Category too short"), // Fixed typo
    price: z.coerce.number().positive(), // Coerce strings to numbers
    stock: z.coerce.number().int().nonnegative() // Fixed name to match App.jsx
});

export default productSchema