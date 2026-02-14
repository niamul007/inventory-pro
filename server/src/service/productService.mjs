import { pool } from '../config/db.mjs';

/**
 * We use 'async' because talking to a database takes time.
 * We use 'await' to wait for the database to reply before moving to the next line.
 */
export const getAllProducts = async () => {
    // 1. The SQL Command
    const sql = 'SELECT * FROM products ORDER BY created_at DESC';

    // 2. The Execution
    // This is the "Aha!" moment: we wait for the pool to finish the query
    const result = await pool.query(sql);

    // 3. The Data
    // 'pg' always returns an object. The actual rows of data are inside '.rows'
    return result.rows; 
};


export const createProduct = async (productData) => {
    const { name, category, price, stock_quantity } = productData;
    
    // $1, $2, etc. are placeholders to prevent SQL Injection
    const sql = `
        INSERT INTO products (name, category, price, stock_quantity) 
        VALUES ($1, $2, $3, $4) 
        RETURNING *`;
        
    const { rows } = await pool.query(sql, [name, category, price, stock_quantity]);
    return rows[0];
};