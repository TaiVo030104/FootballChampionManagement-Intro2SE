const { Player, Team } = require("../models/index");
const AppError = require("../utils/appError");
const apiFeatures = require("../utils/apiFeature");

const playerControllers = {
  getAllPlayers: async (req, res, next) => {
    try {
      const features = new apiFeatures(Player, req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
      const players = await features.execute({
        include: [{ model: Team, as: "team" }],
      });
      res.status(200).json({
        status: "success",
        data: {
          players,
        },
      });
    } catch (err) {
      next(err);
    }
  },
  getPlayer: async (req, res, next) => {
    const player = await Player.findByPk(req.params.id, {
      include: [{ model: Team, as: "team" }],
    });
    if (!player) {
      return next(new AppError("Player not found", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        player,
      },
    });
  },
  createPlayer: async (req, res, next) => {
    try {
      const {
        team_teamid,
        playername,
        birthdate,
        playertype,
        notes,
        goalcount,
      } = req.body;

      const playerData = {
        team_teamid: parseInt(team_teamid, 10),
        playername,
        birthdate: birthdate,
        playertype: playertype,
        notes: notes === "NULL" ? null : notes,
        goalcount: parseInt(goalcount, 10),
      };

      const player = await Player.create(playerData);
      res.status(201).json({
        status: "success",
        data: {
          player,
        },
      });
    } catch (err) {
      next(err);
    }
  },
  updatePlayer: async (req, res, next) => {
    try {
      const {
        team_teamid,
        playername,
        birthdate,
        playertype,
        notes,
        goalcount,
      } = req.body;

      const playerData = {
        team_teamid: parseInt(team_teamid, 10),
        playername,
        birthdate: birthdate,
        playertype: playertype,
        notes: notes === "NULL" ? null : notes,
        goalcount: parseInt(goalcount, 10),
      };
      const player = await Player.findByPk(req.params.id);
      await player.update(playerData);
      res.status(200).json({
        status: "success",
        data: {
          player,
        },
      });
    } catch (err) {
      next(err);
    }
  },
  deletePlayer: async (req, res, next) => {
    try {
      const player = await Player.findByPk(req.params.id);
      if (!player) {
        return next(new AppError("Player not found", 404));
      }
      await player.destroy();
      res.status(204).json({
        status: "success",
        data: null,
      });
    } catch (err) {
      next(err);
    }
  },
};
module.exports = playerControllers;
