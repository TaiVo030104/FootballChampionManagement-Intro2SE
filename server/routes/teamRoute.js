const teamController = require("../controllers/teamController");
const express = require("express");
const router = express.Router();
//const {auth} = require("../middlewares/authMiddleware");

router
  .route("/")
  .get(teamController.getAllTeams)
  .post(teamController.createTeam);

router
  .route("/:id")
  .get(teamController.getTeam)
  .put(teamController.updateTeam)
  .delete(teamController.deleteTeam);

module.exports = router;
