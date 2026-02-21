import express from 'express';
import { validate } from "../middleware/validate.mjs";
import productSchema from "../middleware/validateProduct.mjs";
import { getProduct, addProduct, delProduct, updateProduct } from "../controller/productController.mjs";

const router = express.Router();

/**
 * [The Traffic Controller]:
 * This file maps URLs to specific logic. 
 * The order here defines the "Middleware Chain" for each request.
 */

// Simple Health Check: To verify the server is alive
router.get("/test", (req, res) => {
    res.json({ message: "Router is working!" });
});

// GET: Fetches data. No validation needed.
router.get("/get-product", getProduct);

/**
 * POST: Creates new data. 
 * [Chain]: Request -> Validation Middleware -> Controller
 * If validation fails, 'addProduct' is never even executed.
 */
router.post("/add-product", validate(productSchema), addProduct);

// DELETE: Uses a URL parameter (:id) to identify the target
router.delete("/delete-product/:id", delProduct);

/**
 * PUT: Updates existing data.
 * [Master Note]: Added validate(productSchema) here too! 
 * You must validate the data being sent for an update just 
 * strictly as you do for a new product.
 */
router.put("/update-product/:id", validate(productSchema), updateProduct); 

export default router;