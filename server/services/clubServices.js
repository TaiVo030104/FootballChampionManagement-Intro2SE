const Club = require("../models/Club");
const AppError = require("../utils/appError");
const apiFeatures = require("../utils/apiFeatures");

const clubServices = {
  getAllClubs: async (req, res, next) => {
    const features = new apiFeatures(Club.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    return await features.execute();
  },
  getClub: async (req, res, next) => {
    return await Club.findByPk(id);
  },
  createClub: async (clubData) => {
    return await Club.create(clubData);
  },
  updateClub: async (req, res, next) => {
    const club = await Club.findByPk(id);
    if (!club) {
      return next(new AppError("Club not found", 404));
    }
    await club.update(clubData);
    return club;
  },
  deleteClub: async (req, res, next) => {
    const club = await Club.findByPk(id);
    if (!club) {
      return next(new AppError("Club not found", 404));
    }
    await club.destroy();
  },
};
module.exports = clubServices;
