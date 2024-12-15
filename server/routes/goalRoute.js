const router = require("express").Router();
const goalController = require("../controllers/goalController");
const goalValidation = require("../validation/goalValidation");
router
  .route("/:id")
  .get(goalController.getGoalWithMatchId)
  .post(goalValidation, goalController.createGoal);

router
  .route("/:matchId/:goalTime")
  .put(goalValidation, goalController.updateGoal)
  .delete(goalController.deleteGoal);
module.exports = router;
