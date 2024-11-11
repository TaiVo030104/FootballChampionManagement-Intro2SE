const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./config/database");
const clubRoute = require("./routes/clubRoute");
const goalRoute = require("./routes/goalRoute");
const playerRoute = require("./routes/playerRoute");
const matchRoute = require("./routes/matchRoute");
const tournamentRoute = require("./routes/tournamentRoute");
const errorController = require("./controllers/errorController.js");
const AppError = require("./utils/appError");

// Create an express application
const app = express();
const port = 8000;
app.use(morgan("dev"));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
// Connect to PostgreSQL database
db.connect()
  .then(() => {
    console.log("Connected to PostgreSQL database");
  })
  .catch((err) => {
    console.error("Error connecting to PostgreSQL database", err);
  });

// Routes
app.use("/api/v1/clubs", require("./routes/clubs"));
app.use("/api/v1/players", require("./routes/players"));
app.use("/api/v1/goals", require("./routes/goals"));
app.use("/api/v1/matches", require("./routes/matches"));
app.use("/api/v1/tournaments", require("./routes/tournaments"));
// End of routes

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(errorController);

module.exports = app;
