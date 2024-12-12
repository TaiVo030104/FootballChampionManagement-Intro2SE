const playerController = require("../controllers/playerController");
const express = require("express");
const router = express.Router();
const playerValidation = require("../validation/playerValidation");

router
  .route("/")
  .get(playerController.getAllPlayers)
  .post(playerValidation, playerController.createPlayer);

router
  .route("/:id")
  .get(playerController.getPlayer)
  .put(playerValidation, playerController.updatePlayer)
  .delete(playerController.deletePlayer);
module.exports = router;
