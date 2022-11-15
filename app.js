const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { urlencoded } = require("express");
const app = express();

// routes
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(urlencoded({ extended: false }));
app.use(express.json());

app.use("/posts", (req, res, next) => {
  const token = req.headers.auth;
  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) {
      res.status(400).json("Invalid Request");
    } else {
      req.body.data = decoded._id;
      next();
    }
  });
});

app.use("/", userRoutes);
app.use("/posts", postRoutes);

mongoose.connect(process.env.MONGO_URI, () => {
  console.log("DB is Connected");
  app.listen(PORT, () => {
    console.log(`Server is up and running at http://localhost:${PORT}`);
  });
});
