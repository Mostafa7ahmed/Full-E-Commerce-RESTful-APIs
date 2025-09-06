const categoryModel = require("../Models/category.module");
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
const createCategory = async (req, res) => {
  categoryModel
    .create({
      name,
      slug: name.replace(/\s+/g, "-").toLowerCase(),
    })
    .then((category) => {
      res.status(201).json({
        status: "success",
        message: "Category created successfully",
        data: category,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return res.status(400).json({
          status: "fail",
          message: "Category name must be unique",
        });
      }
      res.status(400).json({
        status: "fail",
        message: "Category not created",
        error: err.message,
      });
    });
};

module.exports = {
  getCategories,
  createCategory,
};
