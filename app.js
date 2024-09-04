const express = require("express");
require("dotenv").config();
const app = express();
const logger = require("./middlewares/logging");
const { notFound, errorHandler } = require("./middlewares/error");
const connectToDB = require("./config/db");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");


// connect to database
connectToDB()


// apply middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(logger)

// helmet
app.use(helmet());

// cors
app.use(cors({
  origin: "http://localhost:3000/"
}));

// for express to understand ejx
app.set("view engine", "ejs");

// static folder
app.use(express.static(path.join(__dirname, "images")))

// routes
app.use("/api/books", require("./routes/books"));
app.use("/api/authors", require("./routes/authors"));
app.use("/api/auth/", require("./routes/auth"));
app.use("/api/users/", require("./routes/users"));
app.use("/api/upload/", require("./routes/upload"));
app.use("/password", require("./routes/password"));

// error handle
app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server runing in ${process.env.ENV} mode on port ${PORT}`));
