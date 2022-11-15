const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1h" });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.userLogin(email, password);
    // create a token
    const token = createToken(user._id);
    res.status(200).json({ status: "success", token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signUp = async function (req, res) {
  console.log(req.body);
  const { name, email, password } = req.body;
  try {
    const user = await User.signup(name, email, password);

    // create a token
    const token = createToken(user._id);
    res.status(200).json({ status: "success", user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { login, signUp };
