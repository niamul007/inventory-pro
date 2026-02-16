import express from 'express';
import { validate } from "../middleware/validate.mjs";
import productSchema from "../middleware/validateProduct.mjs";
import { getProduct, addProduct } from "../controller/productController.mjs";

const router = express.Router();
router.get("/test", (req, res) => {
    res.json({ message: "Router is working!" });
});
router.get("/get-product", getProduct);
// Validation comes FIRST, then addProduct
router.post("/add-product", validate(productSchema), addProduct);

export default router;