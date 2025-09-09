const asyncHandler = require("express-async-handler");
const sendResponse = require("../utils/sendResponse");
const apiErrorHandel = require("../utils/apiError"); // لو عندك كلاس للأخطاء
const productModel = require("../Models/products.module")

// Get All Products public
const getProducts = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 8;
  const skip = (page - 1) * limit;

  const totalCount = await productModel.countDocuments();
  const totalPages = Math.ceil(totalCount / limit);

  const products = await productModel
    .find({})
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .populate({
      path: "category",
      select: "name",
    })
    ;

  return sendResponse(res, 200, "Products fetched successfully", products, {
    pageIndex: page,
    pageSize: limit,
    totalCount,
    totalPages,
    moveNext: page < totalPages,
    movePrevious: page > 1,
  });

});

// Create Product admin only
const createProduct = asyncHandler(async (req, res) => {
  const { title } = req.body.title;
 
  if (title) {
    req.body.slug = title.replace(/\s+/g, "-").toLowerCase();
  }

  const product = await productModel.create(req.body);

  return sendResponse(res, 201, "Product created successfully", product);
});

// Get Specific Product public
const getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await productModel.findById(id).populate({
      path: "category",
      select: "name",
    });;

  if (!product) {
    return next(new apiErrorHandel(`No product for this id: ${id}`, 404));
  }

  return sendResponse(res, 200, "Product fetched successfully", product);
});

// Update Product admin only
const updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { title } = req.body.title;

  if (title) {
    req.body.slug = title.replace(/\s+/g, "-").toLowerCase();
  }

  const product = await productModel.findByIdAndUpdate(id, req.body, {
    new: true,           
  })

  if (!product) {
    return next(new apiErrorHandel(`No product found for this id: ${id}`, 404));
  }

  return sendResponse(res, 200, "Product updated successfully", product);
});

// Delete Product admin only
const deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await productModel.findByIdAndDelete(id);

  if (!product) {
    return next(new apiErrorHandel(`No product for this id: ${id}`, 404));
  }

  return sendResponse(res, 200, "Product deleted successfully", product);
});

module.exports = {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
