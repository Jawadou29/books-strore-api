const {
  Book,
  validateAddedData,
  validateUpdatedData,
} = require("../models/Book");
const asyncHandler = require("express-async-handler");
/**
 * @desc get all books
 * @route /api/books
 * @method GET
 * @access public
 */
const getAllBooks = asyncHandler(async (req, res) => {
  const { minPrice, maxPrice } = req.query;
  let books;
  if (minPrice && maxPrice) {
    books = await Book.find({
      price: { $gte: minPrice, $lte: maxPrice },
    }).populate("author", ["_id", "firstName", "lastName"]);
  } else {
    books = await Book.find().populate("author", [
      "_id",
      "firstName",
      "lastName",
    ]);
  }
  res.status(200).json(books);
});

/**
 * @desc get book with id

 * @method GET
 * @access public
 */
const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id).populate("author");
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: "book not found" });
  }
});

/**
 * @desc add new book
 * @route /api/books/
 * @method POST
 * @access private (only admin)
 */
const addNewBook = asyncHandler(async (req, res) => {
  const { error } = validateAddedData(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image,
  });
  const result = await book.save();
  res.status(201).json(result);
});

/**
 * @desc update book with id
 * @route /api/books
 * @method PUT
 * @access private (only admin)
 */
const updateBook = asyncHandler(async (req, res) => {
  const { error } = validateUpdatedData(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const book = await Book.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
      },
    },
    { new: true }
  );
  res.status(200).json(book);
});

/**
 * @desc delete book
 * @route /api/books/id
 * @method DELETE
 * @access private (only admin)
 */

const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book) {
    await Book.findByIdAndDelete(req.params.id);
    res.status(201).json({ message: "author deleted" });
  } else {
    res.status(404).json({ message: "author not found" });
  }
});

module.exports = {
  getAllBooks,
  getBookById,
  addNewBook,
  updateBook,
  deleteBook
};
