const subCategoryModel = require("../Models/subCategory.module");
const asyncHandler = require("express-async-handler");
const sendResponse = require("../utils/sendResponse");
const apiErrorHandel = require("../utils/apiError"); // لو عندك كلاس للأخطاء


// set CategoryIDinBody 
setCategoryIdToBody = (req, res , next) => {
  // nested Route
  if(!req.body.category)  req.body.category = req.params.categoryId
  next();


};
createFilterObj =  (req, res , next) => {
  // nested Route
  let filterObj = {};
  if(req.params.categoryId) filterObj = {category : req.params.categoryId}
  req.filterObj = filterObj
  next();


};
const getSubCategories = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 8;
  const skip = (page - 1) * limit;

  const totalCount = await subCategoryModel.countDocuments();
  const totalPages = Math.ceil(totalCount / limit);
 
  console.log(req.params)

  // Route forms ==> /api/v1/categories/:categoryId/SubCategory
  const subcategories = await subCategoryModel
    .find(
        req.filterObj
    )
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });


  return sendResponse(
    res,
    200,
    "subCategory fetched successfully",
    subcategories,
    {
      pageIndex: page,
      pageSize: limit,
      totalCount,
      totalPages,
      moveNext: page < totalPages,
      movePrevious: page > 1,
    }
  );
});

// Create Category admin only
const createSubCategory = asyncHandler(async (req, res) => {

  // nested Route
  if(!req.body.category)  req.body.category = req.params.categoryId
  const { name, category } = req.body;
  const subCategory = await subCategoryModel.create({
    name,
    slug: name.replace(/\s+/g, "-").toLowerCase(),
    category,
  });

  return sendResponse(
    res,
    201,
    "subCategory created successfully",
    subCategory
  );
});

// Get Specific Category public
const getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await subCategoryModel.findById(id);
  //! send to request
  // .populate({
  //   path: "category",
  //   select: "name -_id",
  // })
  if (!category) {
    return next(new apiErrorHandel(`No subCategory for this id: ${id}`, 404));
  }

  return sendResponse(res, 200, "subCategory fetched successfully", category);
});

// Update Category admin only
const updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;

  const subcategory = await subCategoryModel.findByIdAndUpdate(
    { _id: id },
    { name, slug: name.replace(/\s+/g, "-").toLowerCase(), category },

    { new: true }
  );

  if (!subcategory) {
    return next(new apiErrorHandel(`No subcategory for this id: ${id}`, 404));
  }

  return sendResponse(
    res,
    200,
    "subcategory updated successfully",
    subcategory
  );
});

// Delete Category admin only
const deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await subCategoryModel.findByIdAndDelete(id);

  if (!category) {
    return next(new apiErrorHandel(`No subCategory for this id: ${id}`, 404));
  }

  return sendResponse(res, 200, "subCategory deleted successfully", category);
});

module.exports = {
  createSubCategory,
  getSubCategories,
  deleteSubCategory,
  getSubCategory,
  updateSubCategory,
  setCategoryIdToBody,
  createFilterObj
};
