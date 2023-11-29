const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },

  image: {
    type: String,
    default:
      "https://divifoodstore.divifixer.com/wp-content/uploads/2021/06/divi-food-store-6-400x250.jpg",
  },
  author: {
    type: String,
  },
});

const Post = mongoose.models?.Post || mongoose.model("Post", postSchema);
module.exports = Post;
