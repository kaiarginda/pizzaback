const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  text: {
    type: String,
  },
  stars: {
    type: Number,
  },
  author: {
    type: String,
  },
});

const Review =
  mongoose.models?.Review || mongoose.model("Review", reviewSchema);
module.exports = Review;
