const sequelize = require("../config/database");
const ranking = require("../models/Ranking");
const AppError = require("../utils/appError");

const rankController = {
  getAllRank: async (req, res, next) => {
    try {
      const [rank, metadata] = await sequelize.query("SELECT * FROM ranking");
      res.status(200).json({ rank });
    } catch (error) {
      next(error);
    }
  },
};
module.exports = rankController;
