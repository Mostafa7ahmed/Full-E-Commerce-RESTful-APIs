const categoryModel = require("../Models/category.module");
const asyncHandler = require("express-async-handler");
const sendResponse = require("../utils/sendResponse");

// Get all categories public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await categoryModel.find({}).sort({ createdAt: -1 });
  return sendResponse(res, 200, "Categories fetched successfully", categories);
});

// Create category admin only
const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const category = await categoryModel.create({
    name,
    slug: name.replace(/\s+/g, "-").toLowerCase(),
  });
  return sendResponse(res, 201, "Category created successfully", category);
});

module.exports = {
  getCategories,
  createCategory,
};