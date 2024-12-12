const router = require("express").Router();
const authController = require("../controllers/authController");
const auth = require("../middleware/authentication");
router.post("/login", authController.login);
router.post("/refresh", authController.refreshToken);
router.post("/logout", auth.verifyToken, authController.logout);
module.exports = router;
