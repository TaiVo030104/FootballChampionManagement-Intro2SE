const { Team, Player } = require("../models/index");
const AppError = require("../utils/appError");
const apiFeatures = require("../utils/apiFeature");

const teamController = {
  getAllTeams: async (req, res, next) => {
    try {
      console.log(req.query);
      const features = new apiFeatures(Team, req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

      const teams = await features.execute();
      res.status(200).json({
        status: "success",
        data: {
          teams,
        },
      });
    } catch (err) {
      next(err);
    }
  },
  getTeam: async (req, res, next) => {
    const team = await Team.findByPk(req.params.id, {
      include: [{ model: Player, as: "players" }],
    });
    if (!team) {
      return next(new AppError("Team not found", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        team,
      },
    });
  },
  createTeam: async (req, res, next) => {
    try {
      const { teamname, fieldname } = req.body;
      console.log(teamname, fieldname);
      const team = await Team.create({ teamname, fieldname });
      res.status(201).json({
        status: "success",
        data: {
          team,
        },
      });
    } catch (err) {
      next(err);
    }
  },
  updateTeam: async (req, res, next) => {
    try {
      const { teamname, fieldname } = req.body;
      const team = await Team.findByPk(req.params.id);
      if (!team) {
        return next(new AppError("Team not found", 404));
      }
      await team.update({ teamname, fieldname });
      res.status(200).json({
        status: "success",
        data: {
          team,
        },
      });
    } catch (err) {
      next(err);
    }
  },
  deleteTeam: async (req, res, next) => {
    try {
      const team = await Team.findByPk(req.params.id);
      if (!team) {
        return next(new AppError("Team not found", 404));
      }
      await team.destroy();
      res.status(204).json({
        status: "success",
        data: null,
      });
    } catch (err) {
      next(err);
    }
  },
};
module.exports = teamController;
