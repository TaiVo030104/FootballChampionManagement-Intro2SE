const { Match, Team, Match_has_Team, Player, Goal } = require("../models");
const AppError = require("../utils/appError");
const apiFeatures = require("../utils/apiFeature");

const matchServices = {
  getAllMatchswithTeam: async (req, res, next) => {
    try {
      const matches = await Match.findAll({
        attributes: ["id", "team1Id", "team2Id"], // Include team1Id and team2Id
        include: [
          {
            model: Team,
            as: "teams",
            through: { attributes: [] }, // Exclude attributes from the join table
          },
        ],
      });

      const matchesWithTeams = matches.map((match) => {
        const team1 = match.teams.find((team) => team.teamID === match.team1Id);
        const team2 = match.teams.find((team) => team.teamID === match.team2Id);
        return {
          ...match.toJSON(),
          team1,
          team2,
        };
      });

      return matchesWithTeams;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getMatchwithAllInfo: async (req, res, next) => {
    try {
      const match = await Match.findByPk(req.params.id, {
        attributes: ["id", "team1Id", "team2Id"], // Include team1Id and team2Id
        include: [
          {
            model: Team,
            as: "teams",
            attributes: ["teamID", "name"], // Include teamID and name
            through: { attributes: [] }, // Exclude attributes from the join table
          },
        ],
      });

      if (!match) {
        return res.status(404).json({ message: "Match not found" });
      }

      const goal = await Goal.findAll({
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

      const team1 = match.teams.find((team) => team.teamID === match.team1Id);
      const team2 = match.teams.find((team) => team.teamID === match.team2Id);

      const matchWithAllInfo = {
        ...match.toJSON(),
        team1,
        team2,
        ...goal.toJSON(),
      };

      res.json(matchWithAllInfo);
    } catch (error) {
      next(error);
    }
  },
  createMatch: async (req, res, next) => {
    try {
      const Team1 = await Team.findByPk(req.body.team1Id);
      const Team2 = await Team.findByPk(req.body.team2Id);
      if (!Team1 || !Team2) {
        return next(new AppError("Team not found", 404));
      }
      const newMatch = await Match.create(req.body.matchData);
    } catch (err) {
      next(err);
    }
  },
  updateMatch: async (req, res, next) => {
    try {
      const { teamId, ...matchData } = req.body;
      const match = await Match.findByPk(req.params.id, {
        include: [{ model: Team, as: "team" }],
      });
      if (!match) {
        return next(new AppError("Match not found", 404));
      }
      await match.update({ ...matchData, team_teamid: teamId });
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
module.exports = matchServices;
