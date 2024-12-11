const playerController = require("../controllers/playerController");
const express = require("express");
const router = express.Router();
const playerValidation = require("../validation/playerValidation");
const auth = require("../middleware/authentication");

router
  .route("/")
  .get(auth.verifyToken, playerController.getAllPlayers)
  .post(playerValidation, playerController.createPlayer);

router
  .route("/:id")
  .get(playerController.getPlayer)
  .put(playerValidation, playerController.updatePlayer)
  .delete(playerController.deletePlayer);
module.exports = router;
