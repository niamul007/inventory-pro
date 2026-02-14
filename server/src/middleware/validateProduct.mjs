import {z} from 'zod';

export const productSchema = z.object({
    name: z.string().min(2,"Item is too small").max(100,"product name should be under 100"),
    caegory: z.string(2,"category name is too small"),
    price: z.number().positive(),
    stock_quantity: z.number().positive()

})
