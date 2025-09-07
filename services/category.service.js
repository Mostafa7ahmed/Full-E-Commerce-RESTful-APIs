const categoryModel = require("../Models/category.module");
const asyncHandler = require("express-async-handler");
const sendResponse = require("../utils/sendResponse");
const apiErrorHandel = require("../utils/apiError"); // لو عندك كلاس للأخطاء

// Get All Categories public
const getCategories = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 8;
  const skip = (page - 1) * limit;

  const totalCount = await categoryModel.countDocuments();
  const totalPages = Math.ceil(totalCount / limit);

  const categories = await categoryModel
    .find({})
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  return sendResponse(res, 200, "Categories fetched successfully", categories, {
    pageIndex: page,
    pageSize: limit,
    totalCount,
    totalPages,
    moveNext: page < totalPages,
    movePrevious: page > 1,
  });

});

// Create Category admin only
const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const category = await categoryModel.create({
    name,
    slug: name.replace(/\s+/g, "-").toLowerCase(),
  });

  return sendResponse(res, 201, "Category created successfully", category);
});

// Get Specific Category public
const getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await categoryModel.findById(id);

  if (!category) {
    return next(new apiErrorHandel(`No category for this id: ${id}`, 404));
  }

  return sendResponse(res, 200, "Category fetched successfully", category);
});

// Update Category admin only
const updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await categoryModel.findByIdAndUpdate(
    { _id: id },
    { name, slug: name.replace(/\s+/g, "-").toLowerCase() },
    { new: true }
  );

  if (!category) {
    return next(new apiErrorHandel(`No category for this id: ${id}`, 404));
  }

  return sendResponse(res, 200, "Category updated successfully", category);
});

// Delete Category admin only
const deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await categoryModel.findByIdAndDelete(id);

  if (!category) {
    return next(new apiErrorHandel(`No category for this id: ${id}`, 404));
  }

  return sendResponse(res, 200, "Category deleted successfully", category);
});

module.exports = {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
