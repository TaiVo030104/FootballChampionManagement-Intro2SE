const teamController = require("../controllers/teamController");
const express = require("express");
const router = express.Router();
const teamValidation = require("../validation/teamValidation");
//const {auth} = require("../middlewares/authMiddleware");

router
  .route("/")
  .get(teamController.getAllTeams)
  .post(teamValidation, teamController.createTeam);

router
  .route("/:id")
  .get(teamController.getTeam)
  .put(teamValidation, teamController.updateTeam)
  .delete(teamController.deleteTeam);

module.exports = router;
