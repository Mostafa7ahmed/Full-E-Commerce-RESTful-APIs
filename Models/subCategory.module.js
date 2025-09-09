const mongoose = require("mongoose");
const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "subCategory required"],
      unique: [true, "subCategory must be unique"],
      minlength: [2, "Too short subCategory name"],
      maxlength: [100, "Too long subCategory name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "subCategory must be belong to category"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("subCategory", subCategorySchema);
