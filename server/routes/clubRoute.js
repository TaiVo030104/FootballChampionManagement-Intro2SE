const clubController = require("../controllers/clubController");
const express = require("express");
const router = express.Router();
const { validateClub } = require("../middlewares/clubMiddleware");
//const {auth} = require("../middlewares/authMiddleware");

router
  .route("/")
  .get(clubController.getAllClubs)
  .post(validateClub, clubController.createClub);

router
  .route("/:id")
  .get(clubController.getClub)
  .put(validateClub, clubController.updateClub)
  .delete(clubController.deleteClub);

module.exports = router;
