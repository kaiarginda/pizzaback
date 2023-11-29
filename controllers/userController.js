const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Product = require("../models/Products");
const Review = require("../models/Review");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
//
//
//
//
exports.createUser = async (req, res) => {
  const saltRounds = 10;
  //   await User.create({ name: "tornike", password: "1234" });
  const password = req.body.password;

  const testUser = await User.findOne({ name: req.body.username });

  if (testUser) return res.json("exists");

  bcrypt
    .genSalt(saltRounds)
    .then((salt) => {
      console.log("Salt: ", salt);
      return bcrypt.hash(password, salt);
    })
    .then(async (hash) => {
      await User.create({ name: req.body.username, password: hash });
      console.log("Hash: ", hash);
    })
    .catch((err) => console.error(err.message));
  return res.json("dsf");
};

exports.findUser = async (req, res) => {
  const body = req.body;
  const user = await User.findOne({ name: body.username });
  // console.log(user, body);
  if (!user) return res.json("invalid");
  const secretKey = "1234";
  //   const user = await User.findOne({ name: body.username });

  try {
    const isPasswordValid = await bcrypt.compare(body.password, user.password);

    if (isPasswordValid) {
      console.log(isPasswordValid, "they really went on");

      const token = jwt.sign({ user }, secretKey);
      res.cookie("token", token);
      return res.json({ status: "success", message: "Login successful" });
    } else {
      // console.log(isPasswordValid, "Password is not valid");
      return res
        .status(401)
        .json({ status: "fail", message: "Invalid password" });
    }
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

exports.getUser = async (req, res) => {
  const name = req.body.name;

  const user = await User.findOne({ name });

  if (!user) return res.json({ status: "no user", user: null });

  return res.json({ status: "success", user });
};

exports.createProduct = async (req, res) => {
  const { name, description, price, author } = req.body; // Access text data from req.body
  const image = req.file ? req.file.filename : null; // Access file data from req.file

  await Product.create({
    name,
    description,
    price,
    image,
    author,
  });

  return res.status(201).json({ message: "Product created successfully" });
};

exports.getProducts = async (req, res) => {
  const products = await Product.find();
  return res.json(products);
};

exports.getLoggedUser = async (req, res) => {
  if (!req.body.token) return;

  const user = jwt.verify(req.body.token, "1234");
  return res.json({ user: user.user });
};

exports.review = async (req, res) => {
  const { reviewText, rating, author } = req.body;
  await Review.create({ text: reviewText, stars: rating, author });
  return res.json("success");
};

exports.getReviews = async (req, res) => {
  const reviews = await Review.find();

  return res.json({ reviews });
};

exports.createPost = async (req, res) => {
  // const { postText, description } = req.body;

  // await Post.create({ name: postText, description });
  // return res.json("success");

  const { postText, description } = req.body; // Access text data from req.body
  const image = req.file ? req.file.filename : null; // Access file data from req.file

  await Post.create({
    name: postText,
    description,
    image,
  });

  return res.status(201).json({ message: "Product created successfully" });
};

exports.getAllPosts = async (req, res) => {
  const posts = await Post.find();

  return res.json(posts);
};

exports.getPost = async (req, res) => {
  const post = await Post.findOne({ _id: req.body.id });

  return res.json(post);
};

//

exports.reply = async (req, res) => {
  const body = req.body;
  // console.log(body, "from fucking reply");
  await Comment.create({
    text: body.reply,
    parentId: body.parentId,
    productId: body.productId,
    author: body.author,
  });
};
exports.comments = async (req, res) => {
  const body = req.body;
  await Comment.create({
    text: body.comment,
    productId: body.postID,
    parentId: body.parentId,
    root: body.onroot,
    author: body.author,
  });

  return new Response("adf");
};

exports.commentList = async (req, res) => {
  const comments = await Comment.find({ root: "root" });
  const allComments = await Comment.find();

  let user = null; // Initialize user as null

  return res.json({ comments, allComments });
  // if (token) {
  //   user = verify(token.value, "secret");
  // }
};

exports.commentsQuantity = async (req, res) => {
  const productId = req.body.id;
  const comments = await Comment.find({ productId });
  // console.log(comments);
  return res.json(comments.length);
};

exports.userData = async (req, res) => {
  const body = req.body;
  const name = req.body.name;
  const products = await Product.find({ author: name });
  const reviews = await Review.find({ author: name });

  return res.json({ prod: products.length, rev: reviews.length });
};
