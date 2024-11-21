const {
  ValidationError,
  UniqueConstraintError,
  ConnectionError,
  ForeignKeyConstraintError,
} = require("sequelize");
const AppError = require("../utils/appError");

const handleValidationErrorSequelize = (err) => {
  const errors = err.errors.map((el) => el.message);
  const message = `Validation error: ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleUniqueConstraintErrorSequelize = (err) => {
  const message = "Unique constraint error.";
  return new AppError(message, 400);
};

const handleConnectionErrorSequelize = (err) => {
  const message = "Database connection error.";
  return new AppError(message, 500);
};

const handleForeignKeyConstraintErrorSequelize = (err) => {
  const message = "Foreign key constraint error.";
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("ERROR 💥", err);
    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (err instanceof ValidationError) {
    err = handleValidationErrorSequelize(err);
  } else if (err instanceof UniqueConstraintError) {
    err = handleUniqueConstraintErrorSequelize(err);
  } else if (err instanceof ConnectionError) {
    err = handleConnectionErrorSequelize(err);
  } else if (err instanceof ForeignKeyConstraintError) {
    err = handleForeignKeyConstraintErrorSequelize(err);
  }

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    sendErrorProd(err, res);
  }
};
