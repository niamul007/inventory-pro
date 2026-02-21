import { pool } from '../config/db.mjs';

/**
 * [The Data Access Layer]:
 * This file contains the raw SQL logic. By keeping SQL here and not in 
 * the controller, we make the code easier to test and maintain.
 */

// Fetches all products, newest first.
export const getAllProducts = async () => {
    const sql = 'SELECT * FROM products ORDER BY created_at DESC';
    const result = await pool.query(sql);
    return result.rows; 
};

/**
 * [Parameterized Query]: 
 * We use $1, $2, etc., instead of putting variables directly in the string.
 * This prevents "SQL Injection" (a major security hack).
 */
export const createProduct = async (productData) => {
    const { name, category, price, stock } = productData;
    const sql = `
        INSERT INTO products (name, category, price, stock) 
        VALUES ($1, $2, $3, $4) 
        RETURNING *`; // RETURNING * gives us the new product (including its ID)
    const { rows } = await pool.query(sql, [name, category, price, stock]);
    return rows[0];
};

// Deletes a product and returns the deleted item so we can confirm it existed.
export const delProduct = async (id) => {
    const sql = `DELETE FROM products WHERE id = $1 RETURNING *`;
    const result = await pool.query(sql, [id]);
    return result.rows[0];
};

/**
 * [Update Logic]:
 * Updates an existing product. Note: We do not manually update 'updated_at' 
 * because the Database (Neon/Postgres) usually handles that automatically.
 */
export const updateProduct = async (id, productData) => {
    const { name, category, price, stock } = productData;
    
    const sql = `
        UPDATE products 
        SET name = $1, category = $2, price = $3, stock = $4
        WHERE id = $5 
        RETURNING *`;

    const { rows } = await pool.query(sql, [name, category, price, stock, id]);
    return rows[0];
};