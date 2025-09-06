const categoryModel = require("../Models/category.module");
const asyncHandler = require('express-async-handler')

const getCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    res.json({
      status: "success",
      message: "Category created successfully",
      data: categories,
    });
  } catch (err) {
    res.status(500).json({ error: "Error fetching categories", details: err });
  }
};
const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const category = await categoryModel.create({name, slug: name.replace(/\s+/g, "-").toLowerCase(),});
    res.status(201).json({
        status: "success",
        message: "Category created successfully",
        data: category,
      });

   
    
});

module.exports = {
  getCategories,
  createCategory,
};
