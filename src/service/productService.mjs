import { pool } from '../config/db.mjs';

export const getAllProducts = async () => {
    const sql = 'SELECT * FROM products ORDER BY created_at DESC';
    const result = await pool.query(sql);
    return result.rows; 
};

export const createProduct = async (productData) => {
    const { name, category, price, stock } = productData;
    const sql = `
        INSERT INTO products (name, category, price, stock) 
        VALUES ($1, $2, $3, $4) 
        RETURNING *`;
    const { rows } = await pool.query(sql, [name, category, price, stock]);
    return rows[0];
};

export const delProduct = async (id) => {
    // 1. Use the DELETE command
    // 2. Use $1 as a placeholder to prevent SQL Injection
    const sql = `DELETE FROM products WHERE id = $1 RETURNING *`;    
    // 3. Pass the ID in an array as the second argument
    const result = await pool.query(sql, [id]);
    
    // Return the deleted item so the frontend knows it's gone
    return result.rows[0];
};