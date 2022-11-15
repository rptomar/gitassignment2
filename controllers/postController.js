const postModel = require("../models/postModel");

const createPost = async (req, res) => {
  const { title, body, image, data } = req.body;
  try {
    if (!title || !body || !image || !data) {
      throw Error("Field(s) are empty");
    }
    postModel
      .create({
        title,
        body,
        image,
        data,
      })
      .then((result) => res.json(result))
      .catch((err) => res.status(400).json(err.message));
  } catch (error) {
    res.status(400).json(error.message);
  }
};
const readPosts = async (req, res) => {
  try {
    postModel.find().then((result) => res.json({ posts: result }));
  } catch (err) {
    res.status(400).json(error.message);
  }
};
const updatePost = async (req, res) => {
  const id = req.params.id;
  postModel
    .findByIdAndUpdate(id, req.body)
    .then((result) => res.json({ status: "success" }))
    .catch((err) => console.log(err));
};
const deletePost = async (req, res) => {
  const id = req.params.id;
  postModel
    .findByIdAndDelete(id)
    .then((result) => res.json({ status: "Successfully Deleted" }))
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  createPost,
  readPosts,
  updatePost,
  deletePost,
};
