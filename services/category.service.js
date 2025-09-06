const categoryModel = require("../Models/category.module");
const asyncHandler = require('express-async-handler')

// Get All Categories public
const getCategories = asyncHandler(async (req, res) => {

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;
  const totalCount = await categoryModel.countDocuments(); 
  const totalPages = Math.ceil(totalCount / limit);

  

  const categories = await categoryModel.find({}).skip(skip).limit(limit);
  res.status(200).json({
    status: "success",
    message: "Categories fetched successfully",
    pageIndex: page,
    pageSize: limit,
    totalCount,
    totalPages,
    moveNext: page < totalPages,
    movePrevious: page > 1,
    data: categories,
  });
});
// Create Category  admin only
const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const category = await categoryModel.create({name, slug: name.replace(/\s+/g, "-").toLowerCase()});
    res.status(201).json({
        status: "success",
        message: "Category created successfully",
        data: category,
      });

   
    
});

// Get Specific Category public
const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await categoryModel.findById(id);
  if (!category) {
    res.status(404).json({
      status: "fail",
      message: "Category not found",
    });
  }
    res.status(200).json({
    status: "success",
    message: "Category fetched successfully",
    data: category,
  });


});

// Update Category  admin only
 const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await categoryModel.findOneAndDelete(
    {_id:id}, 
    {name, slug: name.replace(/\s+/g, "-").toLowerCase(),}, 
    { new: true }
  );
  if (!category) {
    res.status(404).json({
      status: "fail",
      message: "Category not found",
      
    });
  }
    res.status(200).json({
    status: "success",
    message: "Category updated successfully",
    data: category,
  });
 });

// Delete Category  admin only
  // const deleteCategory = asyncHandler(async (req, res) => {
  // const { id } = req.params;
  // const category = await categoryModel.findByIdAndDelete(id);
  // if (!category) {
  //   res.status(404).json({
  //     status: "fail",
  //     message: "Category not found",
  //   });
  // }
  //   res.status(200).json({
  //   status: "success",
  //   message: "Category deleted successfully",
  //   data: category});
  
  // });


module.exports = {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  // deleteCategory
};
