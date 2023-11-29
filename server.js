const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
// mongoose.connect(
//   "mongodb+srv://toko:toko@cluster0.yd33cm5.mongodb.net/?retryWrites=true&w=majority",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
// );
app.use(cors({ credentials: true, origin: "https://pizza-5zit.onrender.com" }));
app.use(express.json()); // Add this line to parse JSON in the request body
app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, "images")));

mongoose.connect(
  "mongodb+srv://toko:toko@cluster0.yd33cm5.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Connection event
app.use("/v1", userRoutes);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB successfully");
});

// Error event
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Disconnection event
mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

// Close the Mongoose connection when Node process ends
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});

// Middleware
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello MERN!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
