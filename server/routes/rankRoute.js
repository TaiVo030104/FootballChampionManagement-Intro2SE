const router = require("express").Router();
const rankController = require("../controllers/rankController");

router.get("/", rankController.getAllRank);

module.exports = router;
