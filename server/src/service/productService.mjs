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

export const updateProduct = async (id, productData) => {
    const { name, category, price, stock } = productData;
    
    // Remove "updated_at" from this string!
    const sql = `
        UPDATE products 
        SET name = $1, category = $2, price = $3, stock = $4
        WHERE id = $5 
        RETURNING *`;

    const { rows } = await pool.query(sql, [name, category, price, stock, id]);
    return rows[0];
};