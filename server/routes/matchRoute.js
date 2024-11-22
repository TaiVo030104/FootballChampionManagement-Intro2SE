const matchController = require("../controllers/matchController");
const express = require("express");
const router = express.Router();
//const {auth} = require("../middlewares/authMiddleware");

router.route("/").get(matchController.getAllMatchswithTeam);
//.post(matchController.createMatch);

router
  .route("/:id")
  .get(matchController.getMatchwithAllInfo)
  .put(matchController.updateMatch)
  .delete(matchController.deleteMatch);

module.exports = router;
