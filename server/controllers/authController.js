const { json } = require("sequelize");
const UserModel = require("../models/Account");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { path } = require("../app");
require("dotenv").config();
const authController = {
  generateAccessToken: (user) => {
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
  },
  generateRefreshToken: (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "30d",
    });
  },
  login: async (req, res, next) => {
    try {
      const user = await UserModel.findOne({
        where: {
          accountname: req.body.username,
        },
      });
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.accountpassword
      );
      if (isPasswordCorrect) {
        const accessToken = authController.generateAccessToken({
          username: user.accountname,
          id: user.idaccount,
        });
        const refreshToken = authController.generateRefreshToken({
          username: user.accountname,
          id: user.idaccount,
        });
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
        });
        const { accountpassword, ...userWithoutPassword } = user.dataValues;
        return res.status(200).json({
          user: userWithoutPassword,
          accessToken,
        });
      }
      return next(new AppError("Wrong username or password"), 500);
    } catch (err) {
      next(err);
    }
  },
  logout: async (req, res, next) => {
    try {
      res.clearCookie("refreshToken");
      res.status(200).json({ message: "Logout success" });
    } catch (err) {
      next(err);
    }
  },
  refreshToken: async (req, res, next) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        return next(new AppError("Refresh token is required", 400));
      }
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      const user = await UserModel.findOne({
        where: {
          idaccount: decoded.id,
        },
      });
      if (!user) {
        return next(new AppError("User not found", 404));
      }
      const accessToken = authController.generateAccessToken({
        username: user.accountname,
        id: user.idaccount,
      });
      return res.status(200).json({ accessToken });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = authController;
