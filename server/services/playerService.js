const Player = require("../models/Player");
const AppError = require("../utils/appError");
const apiFeatures = require("../utils/apiFeatures");

const playerServices = {
  getAllPlayers: async (req, res, next) => {
    const features = new apiFeatures(Player.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    return await features.execute();
  },
  getPlayer: async (req, res, next) => {
    return await Player.findByPk(id);
  },
  createPlayer: async (playerData) => {
    return await Player.create(playerData);
  },
  updatePlayer: async (req, res, next) => {
    const player = await Player.findByPk(id);
    if (!player) {
      return next(new AppError("Player not found", 404));
    }
    await player.update(playerData);
    return player;
  },
  deletePlayer: async (req, res, next) => {
    const player = await Player.findByPk(id);
    if (!player) {
      return next(new AppError("Player not found", 404));
    }
    await player.destroy();
  },
};
