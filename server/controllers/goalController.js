const { Goal, Match, Player, Team } = require("../models");
const AppError = require("../utils/appError");

const goalController = {
  getGoalWithMatchId: async (req, res, next) => {
    try {
      const goals = await Goal.findAll({
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
                attributes: ["teamid", "teamname"],
              },
            ],
          },
        ],
      });
      if (!goals) {
        return next(new AppError("Goal not found", 404));
      }
      res.status(200).json({ goals });
    } catch (error) {
      next(error);
    }
  },
  createGoal: async (req, res, next) => {
    try {
      const { player_playerid, goal_time, goal_type } = req.body;
      const player = await Player.findByPk(player_playerid);
      if (!player) {
        return next(new AppError("Player not found", 404));
      }
      const match = await Match.findByPk(req.params.id);
      if (!match) {
        return next(new AppError("Match not found", 404));
      }
      const goal = await Goal.findAll({
        where: {
          goal_time,
          match_matchid: parseInt(req.params.id, 10),
        },
      });
      if (goal.length > 0) {
        return next(new AppError("Goal already exists", 400));
      }
      const goalData = {
        player_playerid: parseInt(player_playerid, 10),
        match_matchid: parseInt(req.params.id, 10),
        goal_time,
        goal_type,
      };
      const newGoal = await Goal.create(goalData);
      player.goalcount += 1;
      await player.save();
      res.status(201).json({ newGoal });
    } catch (error) {
      next(error);
    }
  },
  updateGoal: async (req, res, next) => {
    try {
      const { goal_time, goal_type } = req.body;
      const match = await Match.findByPk(req.params.matchId);
      if (!match) {
        return next(new AppError("Match not found", 404));
      }
      const newGoal = await Goal.findAll({
        where: {
          goal_time,
          match_matchid: parseInt(req.params.matchId, 10),
        },
      });
      if (newGoal.length > 0) {
        return next(new AppError("Goal already exists", 400));
      }
      const goal = await Goal.findAll({
        where: {
          goal_time: req.params.goalTime,
          match_matchid: parseInt(req.params.matchId, 10),
        },
      });
      if (goal.length == 0) {
        return next(new AppError("Goal is not exists", 400));
      }
      const data = {
        goal_time: goal_time,
        goal_type: goal_type,
      };

      await Goal.update(data, {
        where: {
          goal_time: req.params.goalTime,
          match_matchid: parseInt(req.params.matchId, 10),
        },
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  },
  deleteGoal: async (req, res, next) => {
    try {
      const match_matchid = req.params.matchId;
      const goal_time = req.params.goalTime;
      const match = await Match.findByPk(match_matchid);
      if (!match) {
        return next(new AppError("Match not found", 404));
      }
      const goal = await Goal.findAll({
        where: {
          goal_time,
          match_matchid: parseInt(match_matchid, 10),
        },
      });
      if (goal.length == 0) {
        return next(new AppError("Goal is not exists", 400));
      }
      console.log(goal);
      const player = await Player.findByPk(goal[0].player_playerid);
      if (!player) {
        return next(new AppError("Player not found", 404));
      }
      await Goal.destroy({
        where: {
          goal_time,
          match_matchid: parseInt(match_matchid, 10),
        },
      });
      player.goalcount -= 1;
      await player.save();
      res.status(204).json({
        status: "success",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },
};
module.exports = goalController;
