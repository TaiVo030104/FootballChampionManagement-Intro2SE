const matchServices = require("../services/matchService");
const AppError = require("../utils/appError");

const matchController = {
  getAllMatchswithTeam: async (req, res, next) => {
    try {
      const matchs = await matchServices.getAllMatchswithTeam();
      res.status(200).json({
        status: "success",
        data: matchs,
      });
    } catch (err) {
      next(err);
    }
  },
  getMatchwithAllInfo: async (req, res, next) => {
    try {
      const match = await matchServices.getMatchwithAllInfo();
      if (!match) {
        return next(new AppError("Match not found", 404));
      }
      res.status(200).json({
        status: "success",
        data: match,
      });
    } catch (err) {
      next(err);
    }
  },
  createMatch: async (req, res, next) => {
    try {
      const newMatch = await matchServices.createMatch();
      res.status(201).json({
        status: "success",
        data: newMatch,
      });
    } catch (err) {
      next(err);
    }
  },
  updateMatch: async (req, res, next) => {
    try {
      const updatedMatch = await matchServices.updateMatch();
      res.status(200).json({
        status: "success",
        data: updatedMatch,
      });
    } catch (err) {
      next(err);
    }
  },
  deleteMatch: async (req, res, next) => {
    try {
      await matchServices.deleteMatch();
      res.status(204).json();
    } catch (err) {
      next(err);
    }
  },
};
module.exports = matchController;
