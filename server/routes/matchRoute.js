const matchController = require("../controllers/matchController");
const express = require("express");
const router = express.Router();
//const {auth} = require("../middlewares/authMiddleware");
const matchValidation = require("../validation/matchValidation");

router
  .route("/")
  .get(matchController.getAllMatchswithTeam)
  .post(matchValidation, matchController.createMatch);
router
  .route("/:id")
  .get(matchController.getMatchwithAllInfo)
  .put(matchValidation, matchController.updateMatch)
  .delete(matchController.deleteMatch);
router.post("/generate", matchController.generateMatch);
module.exports = router;
