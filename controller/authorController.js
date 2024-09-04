const asyncHanlder = require("express-async-handler");
const {
  Author,
  validateAddedData,
  validateUpdatedData,
} = require("../models/Author");


/**
 * @desc get all authors
 * @route /api/authors
 * @method GET
 * @access public
 */
const getAllAuthors = asyncHanlder(async (req, res) => {
  const { pageNumber } = req.query;
  const authorPerPage = 2;
  const allAuthors = await Author.find()
    .select("firstName lastName")
    .skip((pageNumber - 1) * authorPerPage)
    .limit(authorPerPage);
  res.status(200).json(allAuthors);
});

/**
 * @desc get author with id
 * @route /api/authors/:id
 * @method GET
 * @access public
*/
const getAuthorById = asyncHanlder(
  async (req, res) => {
      const author = await Author.findById(req.params.id);
      if (author) {
        res.status(200).json(author);
      }
      else{
        res.status(404).json({message: "author not found"});
      }
  }
);

/**
 * @desc add new author
 * @route /api/authors/
 * @method POST
 * @access private (only admin)
*/
const addNewAuthor = asyncHanlder(
  async (req, res) => {
    const { error } = validateAddedData(req.body);
    if (error) {
      return res.status(400).json({message: error.details[0].message});
    }
    const author = new Author({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      nationality: req.body.nationality,
      image: req.body.image
    });
    const result = author.save();
    res.status(201).json(author);
  }
)

/**
 * @desc update author with id
 * @route /api/authors
 * @method PUT
 * @access private (only admin)
*/
const updateAuthor = asyncHanlder(
  async (req, res) => {
    const {error} = validateUpdatedData(req.body);
    if (error) {
      return res.status(400).json({message: error.details[0].message});
    }
    const author = await Author.findByIdAndUpdate(
      req.params.id,
        {
          $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nationality: req.body.nationality,
            image: req.body.image
          }
        },
        {new: true}
    );
    res.status(200).json(author);
  }
)

/**
 * @desc delete author
 * @route /api/authors/id
 * @method DELETE
 * @access private (only admin)
*/
const deleteAuthor = asyncHanlder(
  async(req, res) => {
    const author = await Author.findById(req.params.id);
    if (author) {
      await Author.findByIdAndDelete(req.params.id);
      res.status(201).json({message: "author has been deleted"});
    }
    else{
      res.status(404).json({message: "author not found"});
    }
  }
)






module.exports = {
  getAllAuthors,
  getAuthorById,
  addNewAuthor,
  updateAuthor,
  deleteAuthor
}