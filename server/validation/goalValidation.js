const AppError = require("../utils/appError");

function isValidTime(timeString) {
  const timeRegex = /^([01]\d|2[0-3]):([0-9]\d):([0-5]\d|60)$/;
  return timeRegex.test(timeString);
}
const goalValidation = (req, res, next) => {
  const { goaltime, goaltype } = req.body;
  if (goaltype === "" || isValidTime(goaltime)) {
    return next(new AppError("Time goal or goal type is invalid"), 404);
  }
  next();
};
module.exports = goalValidation;
