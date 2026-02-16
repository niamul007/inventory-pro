import * as productService from "../service/productService.mjs";
import catchAsync from "../utilities/catchAsync.mjs";

export const getProduct = catchAsync(async (req, res, next) => {
  const products = await productService.getAllProducts();
  res.status(200).json({
    status: "success",
    results: products.length,
    data: { products },
  });
});

export const addProduct = catchAsync(async (req, res, next) => {
  const product = await productService.createProduct(req.body);
  res.status(201).json({
    status: "success",
    data: { product },
  });
});