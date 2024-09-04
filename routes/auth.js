const express = require("express");
const router = express.Router();
const { registerUser, logginUser } = require("../controller/authController");


router.post("/register", registerUser)
router.post("/login", logginUser)


module.exports = router;