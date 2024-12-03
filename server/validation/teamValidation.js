const AppError = require("../utils/appError");

const teamValidation = (req, res, next) => {
  const { teamname, fieldname } = req.body;
  if (teamname === "" || fieldname === "") {
    return next(new AppError("Team name and field name are required!"), 404);
  }
  next();
};
module.exports = teamValidation;
