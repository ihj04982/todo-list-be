const User = require("../model/User");
const userController = {};
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

userController.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Error("이미 존재하는 이메일입니다.");
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = new User({ name, email, password: hash });
    await newUser.save();
    res.status(200).json({ status: "success", message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: error.message });
  }
};

userController.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }, "-createdAt, -updatedAt, -__v");
    if (user) {
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (isPasswordValid) {
        const token = user.generateAuthToken();
        return res.status(200).json({ status: "success", message: "User logged in successfully", user, token });
      } else {
        throw new Error("비밀번호가 일치하지 않습니다.");
      }
    } else {
      throw new Error("존재하지 않는 이메일입니다.");
    }
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

userController.getUser = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId, "-__v, -createdAt, -updatedAt, -password");
    if (!user) {
      throw new Error("User not found");
    }
    res.status(200).json({ status: "success", user });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};
module.exports = userController;
