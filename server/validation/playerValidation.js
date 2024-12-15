const AppError = require("../utils/appError");

const playerValidation = (req, res, next) => {
  const { team_teamid, playername, birthdate, playertype, notes, goalcount } =
    req.body;
  if (
    team_teamid === "" ||
    playername === "" ||
    isNaN(new Date(birthdate)) ||
    playertype === "" ||
    goalcount === ""
  ) {
    return next(new AppError("Missing some field"), 404);
  }
  next();
};

module.exports = playerValidation;
