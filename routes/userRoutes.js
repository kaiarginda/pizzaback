// In userRoutes.js
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const multer = require("multer");

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("jpeg") ||
    file.mimetype.includes("png") ||
    file.mimetype.includes("jpg")
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

//  dest: "images/",
const upload = multer({ storage: storage });

router.post("/create-user", UserController.createUser);
router.post("/log-in", UserController.findUser);

router.post("/getUser", UserController.getUser);
router.post(
  "/create-product",
  upload.single("picture"),
  UserController.createProduct
);

router.get("/get-products", UserController.getProducts);
router.post("/getLoggedUser", UserController.getLoggedUser);
router.post("/review", UserController.review);

router.get("/getReviews", UserController.getReviews);
// router.post("/create-post", UserController.createPost);

router.get("/all-posts", UserController.getAllPosts);
router.post("/get-post", UserController.getPost);

router.post("/reply", UserController.reply);
router.get("/commentList", UserController.commentList);

router.post("/comment", UserController.comments);
// ...

router.post(
  "/create-post",
  upload.single("picture"),
  UserController.createPost
);

router.post("/comments-quantity", UserController.commentsQuantity);
router.post("/userdata", UserController.userData);

module.exports = router;
