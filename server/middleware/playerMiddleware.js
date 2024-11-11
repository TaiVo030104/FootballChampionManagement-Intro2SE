const {body , validationResult} = require('express-validator');
const errorHandler = require('../controllers/errorController');

const validatePlayer = [
    body('name')
        .notEmpty()
        .withMessage('Player name is required')
        .isString()
        .withMessage('Player name must be a string'),
    body('position')
        .notEmpty()
        .withMessage('Player position is required')
        .isString()
        .withMessage('Player position must be a string'),
    body('club_id')
        .notEmpty()
        .withMessage('Club id is required')
        .isInt()
        .withMessage('Club id must be an integer'),
    body('age')
        .notEmpty()
        .withMessage('Player age is required')
        .isInt()
        .withMessage('Player age must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = errorHandler.handleValidationError(errors);
            return next(error);
        }
        next();
    }
]
module.exports = { validatePlayer };