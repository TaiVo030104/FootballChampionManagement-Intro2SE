const AppError = require("../utils/appError");

function isValidTime(timeString) {
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  return timeRegex.test(timeString);
}
const matchValidation = (req, res, next) => {
  const {
    matchdate,
    matchtime,
    round_count,
    fieldname,
    score1,
    score2,
    team_team1,
    team_team2,
  } = req.body;
  if (isNaN(new Date(matchdate)) || isValidTime(matchtime)) {
    return next(new AppError("Date and Time is invalid"), 404);
  }
  next();
};
module.exports = matchValidation;
