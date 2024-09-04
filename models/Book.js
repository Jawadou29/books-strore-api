const mongoos = require("mongoose");
const joi = require("joi");

const bookSchema = new mongoos.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    minLength: 3,
    maxLength: 200,
  },
  author: {
    type: mongoos.Schema.Types.ObjectId,
    required: true,
    ref: "author",
  },
  description: {
    type: String,
    trim: true,
    required: true,
    minLength: 5,
  },
  price: {
    type: Number,
    required: true,
    minLength: 0,
  },
  image: {
    type: String,
    require: true,
    enum: ["soft cover", "hard cover"]
  }
}, {
  timestamps: true,
});



function validateAddedData(obj) {
  const schema = joi.object({
    title: joi.string().trim().min(3).max(200).required(),
    author: joi.string().required(),
    description: joi.string().trim().min(5).required(),
    price: joi.number().min(0).required(),
    image: joi.string().valid("soft cover", "hard cover").required()
  });
  return schema.validate(obj);
}

function validateUpdatedData(obj) {
  const schema = joi.object({
    title: joi.string().trim().min(3).max(200),
    author: joi.string(),
    description: joi.string().trim().min(5),
    price: joi.number().min(0),
    image: joi.string().valid("soft cover", "hard cover")
  });

  
  return schema.validate(obj);
}

const Book = mongoos.model("Book", bookSchema);

module.exports = {
  Book,
  validateAddedData,
  validateUpdatedData
}