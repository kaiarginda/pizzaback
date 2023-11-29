const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  image: {
    type: String,
    default:
      "https://divifoodstore.divifixer.com/wp-content/uploads/2021/06/divi-food-store-p4-300x300.png",
  },
  author: {
    type: String,
  },
});

const Product =
  mongoose.models?.Product || mongoose.model("Product", productSchema);
module.exports = Product;
