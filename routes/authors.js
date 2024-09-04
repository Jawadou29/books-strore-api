const express = require("express");
const router = express.Router();
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const {
  getAllAuthors,
  getAuthorById,
  addNewAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../controller/authorController");

// api/authors
router.route("/").get(getAllAuthors).post(verifyTokenAndAdmin, addNewAuthor);

// api/authors/:id
router
  .route("/:id")
  .get(getAuthorById)
  .put(verifyTokenAndAdmin, updateAuthor)
  .delete(verifyTokenAndAdmin, deleteAuthor);

// router.get("/", getAllAuthors);
// router.get("/:id", getAuthorById);
// router.post("/", verifyTokenAndAdmin, addNewAuthor);
// router.put("/:id", verifyTokenAndAdmin, updateAuthor);
// router.delete("/:id", verifyTokenAndAdmin, deleteAuthor);
module.exports = router;
