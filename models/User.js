const mongoose = require("mongoose");
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minLength: 5,
    maxLength: 100,
    unique: true
  },
  username: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 100,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 8,
    maxLength: 100,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  }
}, {timestamps: true})

// genrate token
userSchema.methods.genrateToken = function() {
  return jwt.sign({id: this._id, isAdmin: this.isAdmin}, process.env.JWT_SECRET_KEY);
}

const User = mongoose.model("user", userSchema);


// validate register user
function validateNewUsers(obj) {
  const schema = joi.object({
    email: joi.string().required().min(5).max(100).trim(),
    username: joi.string().required().min(5).max(100).trim(),
    password: passwordComplexity().required(),
  })
  return schema.validate(obj);
}
// validate loggin user
function validateLoggingUsers(obj) {
  const schema = joi.object({
    email: joi.string().required().min(5).max(100).trim(),
    password: joi.string().required().min(6).max(100).trim(),
  })
  return schema.validate(obj);
}

// validate change password
function validateChangePassword(obj) {
  const schema = joi.object({
    password: joi.string().required().min(6).max(100).trim(),
  })
  return schema.validate(obj);
}

// validate update user
function validateUpdateUsers(obj) {
  const schema = joi.object({
    email: joi.string().min(5).max(100).trim(),
    username: joi.string().min(5).max(100).trim(),
    password: joi.string().min(6).max(100).trim(),
  })
  return schema.validate(obj);
}
module.exports = {
  User,
  validateLoggingUsers,
  validateNewUsers,
  validateUpdateUsers,
  validateChangePassword
}