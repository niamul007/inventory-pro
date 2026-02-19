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

export const delProduct = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // 1. Call the delete service (The one using DELETE FROM ... WHERE id = $1)
    const deletedProduct = await productService.delProduct(id);

    // 2. Check if the product actually existed
    if (!deletedProduct) {
      return res.status(404).json({
        status: "fail",
        message: "No product found with that ID",
      });
    }

    // 3. Send back a 200 (OK) or 204 (No Content)
    res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
      data: null // Or send back deletedProduct if you want to show what was lost
    });
  } catch (err) {
    next(err); // Send errors to your global error handler
  }
});