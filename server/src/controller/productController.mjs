// 1. Double check your path (usually it's '../services/...' if in the controllers folder)
import * as productService from "../service/productService.mjs";
import { catchAsync } from "../utils/catchAsync.mjs";

export const getProduct = catchAsync(async (req, res, next) => {
  // 2. Call the service
  const products = await productService.getAllProducts();

  // 3. Send the response
  res.status(200).json({
    status: "success",
    results: products.length, // Senior Tip: Always send the count for arrays
    data: {
      products, // Wrapping in an object makes it easier to add more data later
    },
  });
});

export const addProduct = catchAsync(async (req, res, next) => {
  const products = await productService.createProduct(req.body);

  res.status(200).json({
    status: "success",
    results: product.length,
    data: {
      products,
    },
  });
});
