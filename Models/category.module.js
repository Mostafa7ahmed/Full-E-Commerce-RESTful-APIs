const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true , "Category name is required"], 
    unique: [true , "Category name is required"], 
    minlength: [3, "Category name must be at least 3 characters"] ,
    maxlength: [50, "Category can't be more than 200 characters"]
  },
  slug: { 
    type: String,
    lowercase: true,
    unique: true

  },

   
  image: String 

} , { timestamps: true });
module.exports = mongoose.model('Category', categorySchema);