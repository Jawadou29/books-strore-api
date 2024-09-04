const mongoose = require("mongoose");
const joi = require("joi");

const authorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 200,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 100,
  },
  nationality: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 100,
  },
  image: {
    type: String,
    default: "avatar.png"
  }
}, {
  timestamps: true
});
const Author = mongoose.model("author", authorSchema);

function validateAddedData(obj) {
  const schema = joi.object({
    firstName: joi.string().min(3).max(200).required(),
    lastName: joi.string().min(3).max(100).required(),
    nationality: joi.string().min(2).max(100),
    image: joi.string()
  });
  return schema.validate(obj);
}

function validateUpdatedData(obj) {
  const schema = joi.object({
    firstName: joi.string().min(3).max(200),
    lastName: joi.string().min(3).max(100),
    nationality: joi.string().min(2).max(100),
    image: joi.string()
  });
  return schema.validate(obj);
}

module.exports = {
  Author,
  validateAddedData,
  validateUpdatedData
};