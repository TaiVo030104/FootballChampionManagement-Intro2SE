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
        minage,
        maxage,
        goaltypecount,
        maxgoaltime,
        winscore,
        losescore,
        drawscore,
      } = req.body;
      const ruleData = {
        minage: parseInt(minage, 10),
        maxage: parseInt(maxage, 10),
        goaltype_count: parseInt(goaltypecount, 10),
        maxgoaltime: parseInt(maxgoaltime, 10),
        winscore: parseInt(winscore, 10),
        losescore: parseInt(losescore, 10),
        drawscore: parseInt(drawscore, 10),
      };
      await rule.update(ruleData);
      res.status(200).json({ rule });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = ruleController;
