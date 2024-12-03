const { Match, Team, Player, Goal } = require("../models");
const AppError = require("../utils/appError");
const apiFeatures = require("../utils/apiFeature");
const { parse } = require("dotenv");

const matchController = {
  getAllMatchswithTeam: async (req, res, next) => {
    try {
      const matches = await Match.findAll({
        include: [
          {
            model: Team,
            as: "team1",
          },
          {
            model: Team,
            as: "team2",
          },
        ],
      });
      return res.status(200).json({
        status: "success",
        data: {
          matches,
        },
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getMatchwithAllInfo: async (req, res, next) => {
    try {
      const match = await Match.findByPk(req.params.id, {
        include: [
          {
            model: Team,
            as: "team1",
            attributes: ["teamid", "teamname"], // Include teamID and name
          },
          {
            model: Team,
            as: "team2",
            attributes: ["teamid", "teamname"], // Include teamID and name
          },
        ],
      });

      if (!match) {
        return res.status(404).json({ message: "Match not found" });
      }

      const goal = await Goal.findAll({
        attributes: ["goaltime", "goaltype"],
        where: {
          match_matchid: req.params.id,
        },
        include: [
          {
            model: Player,
            as: "player",
            include: [
              {
                model: Team,
                as: "team",
              },
            ],
          },
        ],
      });

      if (!goal) {
        return res.status(404).json({ message: "Goal not found" });
      }

      const matchWithAllInfo = {
        ...match.toJSON(),
        goals: goal.map((g) => g.toJSON()),
      };

      res.status(200).json({
        status: "success",
        data: {
          matchWithAllInfo,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  createMatch: async (req, res, next) => {
    try {
      const {
        team_team1,
        team_team2,
        matchdate,
        matchtime,
        fieldname,
        roundcount,
      } = req.body;
      console.log(req.body);
      const matchData = {
        team_team1: team_team1,
        team_team2: team_team2,
        matchdate: matchdate,
        matchtime: matchtime,
        fieldname: fieldname,
        roundcount: roundcount,
        score1: null,
        score2: null,
      };
      console.log(matchData);
      const Team1 = await Team.findByPk(team_team1);
      const Team2 = await Team.findByPk(team_team2);
      if (!Team1 || !Team2) {
        return next(new AppError("Team not found", 404));
      }
      if (team_team1 === team_team2) {
        return next(new AppError("Team1 and Team2 cannot be the same", 400));
      }
      if (Team1.fieldname !== fieldname && Team2.fieldname !== fieldname) {
        return next(new AppError("Fieldname does not match", 400));
      }
      const newMatch = await Match.create(matchData);
      res.status(201).json({
        status: "success",
        data: {
          newMatch,
        },
      });
    } catch (err) {
      next(err);
    }
  },
  updateMatch: async (req, res, next) => {
    try {
      const {
        matchdate,
        matchtime,
        //roundcount,
        fieldname,
        score1,
        score2,
        // team_team1,
        //team_team2,
      } = req.body;
      const matchData = {
        matchdate: matchdate,
        //new Date(match_date).toISOString().split("T")[0],
        //roundcount: roundcount === "" ? 0 : parseInt(roundcount, 10),
        matchtime: matchtime,
        fieldname: fieldname,
        score1: score1 === "" ? null : parseInt(score1, 10),
        score2: score2 === "" ? null : parseInt(score2, 10),
        //team_team1: parseInt(team_team1, 10),
        //team_team2: parseInt(team_team2, 10),
      };
      const match = await Match.findByPk(req.params.id);
      if (!match) {
        return next(new AppError("Match not found", 404));
      }
      const Team1 = await Team.findByPk(match.team_team1);
      const Team2 = await Team.findByPk(match.team_team2);
      if (!Team1 || !Team2) {
        return next(new AppError("Team not found", 404));
      }
      if (team_team1 === team_team2) {
        return next(new AppError("Team1 and Team2 cannot be the same", 400));
      }
      if (Team1.fieldname !== fieldname && Team2.fieldname !== fieldname) {
        return next(new AppError("Fieldname does not match", 400));
      }
      await match.update(matchData);
      res.status(200).json({
        status: "success",
        data: {
          match,
        },
      });
    } catch (err) {
      next(err);
    }
  },
  deleteMatch: async (req, res, next) => {
    try {
      const match = await Match.findByPk(req.params.id);
      if (!match) {
        return next(new AppError("Match not found", 404));
      }
      await match.destroy();
      res.status(204).json({
        status: "success",
        data: null,
      });
    } catch (err) {
      next(err);
    }
  },
};
module.exports = matchController;
