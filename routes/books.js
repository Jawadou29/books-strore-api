const express = require("express");
const router = express.Router();
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const {
  getAllBooks,
  getBookById,
  addNewBook,
  updateBook,
  deleteBook,
} = require("../controller/bookController");

// api/books
router
  .route("/")
  .get(getAllBooks)
  .post(verifyTokenAndAdmin, addNewBook);

// api/books/:id
router
  .route("/:id")
  .get(getBookById)
  .put(verifyTokenAndAdmin, updateBook)
  .delete(verifyTokenAndAdmin, deleteBook);

// router.get("/", getAllBooks);
// router.get("/:id", getBookById);
// router.post("/", verifyTokenAndAdmin, addNewBook);
// router.put("/:id", verifyTokenAndAdmin, updateBook);
// router.delete("/:id", verifyTokenAndAdmin, deleteBook);

module.exports = router;
