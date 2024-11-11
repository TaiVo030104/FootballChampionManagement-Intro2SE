const {
  ValidationError,
  UniqueConstraintError,
  ConnectionError,
  ForeignKeyConstraintError,
} = require("sequelize");
const AppError = require("./appError");

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

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // Phân loại lỗi Sequelize
  if (err instanceof ValidationError) {
    err = handleValidationErrorSequelize(err);
  } else if (err instanceof UniqueConstraintError) {
    err = handleUniqueConstraintErrorSequelize(err);
  } else if (err instanceof ConnectionError) {
    err = handleConnectionErrorSequelize(err);
  } else if (err instanceof ForeignKeyConstraintError) {
    err = handleForeignKeyConstraintErrorSequelize(err);
  } else {
    // Xử lý các lỗi không thuộc Sequelize
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
  }

  // Gửi phản hồi
  if (process.env.NODE_ENV === "development") {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  } else if (process.env.NODE_ENV === "production") {
    // Lỗi là operational
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } else {
      // Lỗi không xác định
      console.error("ERROR 💥", err);
      res.status(500).json({
        status: "error",
        message: "Something went very wrong!",
      });
    }
  }
};
