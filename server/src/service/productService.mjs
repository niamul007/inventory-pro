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
// 

export const delProduct = async (id) =>{
    const sql = `DELETE  FROM products WHERE id = $1 RETURNING *`
    const result =  await pool.query(sql,[id]);
    return result.rows[0];
}