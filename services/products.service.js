const asyncHandler = require("express-async-handler");
const sendResponse = require("../utils/sendResponse");
const apiErrorHandel = require("../utils/apiError"); // لو عندك كلاس للأخطاء
const productModel = require("../Models/products.module")

// Get All Products public
const getProducts = asyncHandler(async (req, res) => {
 

  // 1 ) filter by 
  const queryStringObj= {...req.query};
  const executeFileds = ['pageIndex', 'pageSize', 'sort', 'fields','pagesiz' ]
  executeFileds.forEach((field)=> delete queryStringObj[field])
  let queryStr = JSON.stringify(queryStringObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
  let queryObj = JSON.parse(queryStr);
  const fixedQueryObj = {};
  for (let key in queryObj) {
    if (key.includes('[')) {
      const [field, operator] = key.split('['); 
      const cleanOperator = operator.replace(']', ''); 
      if (!fixedQueryObj[field]) fixedQueryObj[field] = {};
      fixedQueryObj[field][cleanOperator] = Number(queryObj[key]);
    } else {
      fixedQueryObj[key] = queryObj[key];
    }
  }

 // 2 ) pagination
  const pageIndex = Number(req.query.pageIndex) || 1;
  const pageSize = Number(req.query.pageSize) || 50;
  const skip = (pageIndex - 1) * pageSize;
  const totalCount = await productModel.countDocuments();
  const totalPages = Math.ceil(totalCount / pageSize);


  // 3 ) Sort

  // Build Query
  const mongooseQuery = productModel
    .find(fixedQueryObj)
    .skip(skip)
    .limit(pageSize)
    .sort({ createdAt: -1 })
    .populate({
      path: "category",
      select: "name",
    });

    // Execute Query
    const products = await mongooseQuery


  return sendResponse(res, 200, "Products fetched successfully", products, {
    pageIndex: pageIndex,
    pageSize: pageSize,
    totalCount,
    totalPages,
    moveNext: pageIndex < totalPages,
    movePrevious: pageIndex > 1,
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
