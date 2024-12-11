const jwt = require("jsonwebtoken");
const UserModel = require("../models/Account");
require("dotenv").config();

const auth = {
  verifyToken: async (req, res, next) => {
    try {
      const token = req.header("Authorization").replace("Bearer ", "");
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await UserModel.findOne({
        where: {
          idaccount: decoded.id,
        },
      });
      if (!user) {
        throw new Error();
      }
      req.user = user;
      next();
    } catch (error) {
      res.status(401).send({ error: "Please authenticate" });
    }
  },
};
module.exports = auth;
