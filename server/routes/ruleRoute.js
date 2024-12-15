const Router = require("express").Router;
const router = Router();
const ruleController = require("../controllers/ruleController");

router
  .route("/")
  .get(ruleController.getAllRules)
  .put(ruleController.updateRule);

module.exports = router;
