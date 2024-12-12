const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const teamRoute = require("./routes/teamRoute");
const goalRoute = require("./routes/goalRoute");
const playerRoute = require("./routes/playerRoute");
const matchRoute = require("./routes/matchRoute");
const errorController = require("./controllers/errorController.js");
const AppError = require("./utils/appError");

// Create an express application
const app = express();
app.use(morgan("dev"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const auth = require("./middleware/authentication");
// Routes
app.use("/api/v1/teams", auth.verifyToken, require("./routes/teamRoute"));
app.use("/api/v1/players", auth.verifyToken, require("./routes/playerRoute"));
app.use("/api/v1/matches", auth.verifyToken, require("./routes/matchRoute"));
app.use("/api/v1/rules", auth.verifyToken, require("./routes/ruleRoute"));
app.use("/api/v1/goals", auth.verifyToken, require("./routes/goalRoute"));
app.use("/api/v1/rank", auth.verifyToken, require("./routes/rankRoute"));
app.use("/api/v1/auth", require("./routes/authRoute"));
// End of routes

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(errorController);

module.exports = app;
