const authController = {};
const jwt = require("jsonwebtoken");
require("dotenv").config();

authController.authenticate = async (req, res, next) => {
  try {
    const tokenString = req.headers.authorization;
    if (!tokenString) {
      throw new Error("invalid token");
    }
    const token = tokenString.replace("Bearer ", "");
    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, payload) => {
      if (error) {
        throw new Error("invalid token");
      }
      req.userId = payload._id;
    });
    next();
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

module.exports = authController;
