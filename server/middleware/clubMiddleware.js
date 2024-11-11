const { body, validationResult } = require("express-validator");
const errorHandler = require("../controllers/errorController");

const validateClub = [
  body("name")
    .notEmpty()
    .withMessage("Club name is required")
    .isString()
    .withMessage("Club name must be a string"),
  body("stadium")
    .optional()
    .isString()
    .withMessage("Stadium name must be a string"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = errorHandler.handleValidationError(errors);
      return next(error);
    }
    next();
  },
];

module.exports = {
  validateClub,
};
