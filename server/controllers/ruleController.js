const Rule = require("../models/Rule");
const AppError = require("../utils/appError");
const ruleController = {
  getAllRules: async (req, res, next) => {
    try {
      const rules = await Rule.findAll();
      res.status(200).json({ rules });
    } catch (error) {
      next(error);
    }
  },
  updateRule: async (req, res, next) => {
    try {
      const rule = await Rule.findAll();
      if (!rule) {
        return next(new AppError("Rule not found", 404));
      }
      const {
        min_age,
        max_age,
        goal_type_count,
        max_goal_time,
        win_score,
        lose_score,
        draw_score,
      } = req.body;
      const ruleData = {
        min_age: parseInt(min_age, 10),
        max_age: parseInt(max_age, 10),
        goal_type_count: parseInt(goal_type_count, 10),
        max_goal_time: parseInt(max_goal_time, 10),
        win_score: parseInt(win_score, 10),
        lose_score: parseInt(lose_score, 10),
        draw_score: parseInt(draw_score, 10),
      };
      await rule.update(ruleData);
      res.status(200).json({ rule });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = ruleController;
