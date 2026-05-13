const mongoose = require("mongoose");

//Fat models,thin controllers philosophy
const productSchema = new mongoose.Schema({
 title: {
    type: String,
    required: [true, "Name of the product"],
  },
  price: {
    type: Number,
    required: [true, "Amount of the product"],
  },
  image: { type: String, default: "default.jpg" },
  category: {
    type: String,
    required: [true, "Product Category"],
  },
  description: {
    type: String,
    required: [true, "Product Description"],
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
