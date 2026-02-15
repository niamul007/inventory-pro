import { validate } from "../middleware/validate.mjs";
import express from 'express';
import productSchema from "../middleware/validateProduct.mjs";
import { getProduct , addProduct } from "../controller/productController.mjs";


const router = express.Router();

router.get("/get-product", getProduct);
router.post("/add-product",addProduct);

export default router;
