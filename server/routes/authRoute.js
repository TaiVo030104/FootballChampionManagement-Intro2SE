const router = require("express").Router();
const authController = require("../controllers/authController");
const authValidation = require("../validation/authValidation");

router.post("/login", authValidation, authController.login);

module.exports = router;
