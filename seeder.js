const connectToDB = require("./config/db");
const { books, authors } = require("./data");
const { Book } = require("./models/Book");
const { Author } = require("./models/Author");
require("dotenv").config();

// connect to database
connectToDB()

// import books
const importBooks = async () => {
  try {
    await Book.insertMany(books);
    console.log("books imported");
  } catch (error) {
    console.log(error);
    process.exit(1); // exit the connection with database
  }
}

// import authors
const importAuthors = async () => {
  try {
    await Author.insertMany(authors);
    console.log("authors imported");
  } catch (error) {
    console.log(error);
    process.exit(1); // exit the connection with database
  }
}

// remove books
const removeBooks = async () => {
  try {
    await Book.deleteMany();
    console.log("books removed");
  } catch (error) {
    console.log(error);
    process.exit(1); // exit the connection with database
  }
}

// remove authors
const removeAuthors = async () => {
  try {
    await Author.deleteMany();
    console.log("authors removed");
  } catch (error) {
    console.log(error);
    process.exit(1); // exit the connection with database
  }
}

if (process.argv[2] === "-import") {
  importBooks();
}
else if (process.argv[2] === "-remove") {
  removeBooks();
}
else if (process.argv[2] === "-import-authors") {
  importAuthors();
}
else if (process.argv[2] === "-remove-authors") {
  removeAuthors();
}