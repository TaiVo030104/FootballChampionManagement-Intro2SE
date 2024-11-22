const router = require("express").Router();
const goalController = require("../controllers/goalController");

router
  .route("/:id")
  .get(goalController.getGoalWithMatchId)
  .post(goalController.createGoal);

router
  .route("/:matchId/:goalTime")
  .put(goalController.updateGoal)
  .delete(goalController.deleteGoal);
module.exports = router;
