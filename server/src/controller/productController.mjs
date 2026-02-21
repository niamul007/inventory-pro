import * as productService from "../service/productService.mjs";
import catchAsync from "../utilities/catchAsync.mjs";
import AppError from "../utilities/appError.mjs"; // Make sure to import this!

/**
 * [The Controller Layer]:
 * This is the "Brain." It receives the request, asks the Service 
 * to do the heavy lifting, and sends the response back to the client.
 */

// Fetches all products and formats the response for the Frontend
export const getProduct = catchAsync(async (req, res, next) => {
  const products = await productService.getAllProducts();
  res.status(200).json({
    status: "success",
    results: products.length,
    data: { products },
  });
});

// Creates a new product using the validated req.body
export const addProduct = catchAsync(async (req, res, next) => {
  const product = await productService.createProduct(req.body);
  res.status(201).json({
    status: "success",
    data: { product },
  });
});

/**
 * [Delete Logic]: 
 * CLEANUP NOTE: You had a try/catch here, but catchAsync already does 
 * that for you! I've converted the check to use your AppError system.
 */
export const delProduct = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const deletedProduct = await productService.delProduct(id);

    // If the database returns nothing, it means the ID was wrong.
    // We send this to our Global Error Handler via next(new AppError).
    if (!deletedProduct) {
      return next(new AppError("No product found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
      data: null 
    });
});

// Updates an existing product and returns the fresh data
export const updateProduct = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { name, category, price, stock } = req.body;

    const updatedProduct = await productService.updateProduct(id, { name, category, price, stock });

    if (!updatedProduct) {
        return next(new AppError('No product found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: { product: updatedProduct }
    });
});