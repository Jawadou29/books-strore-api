const express = require("express");
const {
  getForgotPasswordView,
  sendForgotPasswordLink,
  getResetPasswordView,
  resetThePassword,
} = require("../controller/passwordController");
const router = express.Router();

// /password/fogot-password
router
  .route("/forgot-password")
  .get(getForgotPasswordView)
  .post(sendForgotPasswordLink);
// /password/forgot-password/:userId/:token
router.route("/reset-password/:userId/:token")
      .get(getResetPasswordView)
      .post(resetThePassword)

module.exports = router;
