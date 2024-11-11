const clubServices = require("../services/clubServices");
const AppError = require("../utils/appError");

const clubController = {
  getAllClubs: async (req, res, next) => {
    try {
      const clubs = await clubServices.getAllClubs();
      res.status(200).json({
        status: "success",
        data: clubs,
      });
    } catch (err) {
      next(err);
    }
  },
  getClub: async (req, res, next) => {
    try {
      const club = await clubServices.getClub();
      if (!club) {
        return next(new AppError("Club not found", 404));
      }
      res.status(200).json({
        status: "success",
        data: club,
      });
    } catch (err) {
      next(err);
    }
  },
  createClub: async (req, res, next) => {
    try {
      const newClub = await clubServices.createClub();
      res.status(201).json({
        status: "success",
        data: newClub,
      });
    } catch (err) {
      next(err);
    }
  },
  updateClub: async (req, res, next) => {
    try {
      const updatedClub = await clubServices.updateClub();
      res.status(200).json({
        status: "success",
        data: updatedClub,
      });
    } catch (err) {
      next(err);
    }
  },
  deleteClub: async (req, res, next) => {
    try {
      await clubServices.deleteClub();
      res.status(204).json();
    } catch (err) {
      next(err);
    }
  },
};
module.exports = clubController;
