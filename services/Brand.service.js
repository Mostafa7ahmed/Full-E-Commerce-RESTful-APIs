const asyncHandler = require("express-async-handler");
const sendResponse = require("../utils/sendResponse");
const apiErrorHandel = require("../utils/apiError"); // لو عندك كلاس للأخطاء
const brandModel = require("../Models/brands.module")
// Get All Categories public
const getBrands = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 8;
  const skip = (page - 1) * limit;

  const totalCount = await brandModel.countDocuments();
  const totalPages = Math.ceil(totalCount / limit);

  const categories = await brandModel
    .find({})
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  return sendResponse(res, 200, "Brands fetched successfully", categories, {
    pageIndex: page,
    pageSize: limit,
    totalCount,
    totalPages,
    moveNext: page < totalPages,
    movePrevious: page > 1,
  });

});

// Create Brand admin only
const createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const category = await brandModel.create({
    name,
    slug: name.replace(/\s+/g, "-").toLowerCase(),
  });

  return sendResponse(res, 201, "Brand created successfully", category);
});

// Get Specific Brand public
const getBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await brandModel.findById(id);

  if (!category) {
    return next(new apiErrorHandel(`No category for this id: ${id}`, 404));
  }

  return sendResponse(res, 200, "Brand fetched successfully", category);
});

// Update Brand admin only
const updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await brandModel.findByIdAndUpdate(
    { _id: id },
    { name, slug: name.replace(/\s+/g, "-").toLowerCase() },
    { new: true }
  );

  if (!category) {
    return next(new apiErrorHandel(`No category for this id: ${id}`, 404));
  }

  return sendResponse(res, 200, "Brand updated successfully", category);
});

// Delete Brand admin only
const deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await brandModel.findByIdAndDelete(id);

  if (!category) {
    return next(new apiErrorHandel(`No category for this id: ${id}`, 404));
  }

  return sendResponse(res, 200, "Brand deleted successfully", category);
});

module.exports = {
  getBrands,
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
};
