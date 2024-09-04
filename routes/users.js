const express = require("express");
const router = express.Router();
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../middlewares/verifyToken");
const {
  updateUser,
  getAllUsers,
  getUserById,
  deleteUser,
} = require("../controller/usersController");

// /api/users
router.route("/").get(verifyTokenAndAdmin, getAllUsers);

// api/users/:id
router
  .route("/:id")
  .put(verifyTokenAndAuthorization, updateUser)
  .get(verifyTokenAndAuthorization, getUserById)
  .delete(verifyTokenAndAuthorization, deleteUser);

// router.put("/:id", verifyTokenAndAuthorization, updateUser);
// router.get("/", verifyTokenAndAdmin, getAllUsers);
// router.get("/:id", verifyTokenAndAuthorization, getUserById);
// router.delete("/:id", verifyTokenAndAuthorization, deleteUser);

module.exports = router;
