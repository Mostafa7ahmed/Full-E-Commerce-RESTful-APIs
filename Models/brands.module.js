const mongoose = require("mongoose");
const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
           trim : true,

      required: [true, "Brand required"],
      unique: [true, "Brand must be unique"],
      minlength: [3, "Too short Brand name"],
      maxlength: [100, "Too long Brand name"],
    },

    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Brand", brandSchema);
