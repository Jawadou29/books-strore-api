const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User, validateUpdateUsers } = require("../models/User");

/**
 * @desc update user
 * @route /api/users/:id
 * @method PUT
 * @access private
 */
const updateUser = asyncHandler(async (req, res) => {
  const { error } = validateUpdateUsers(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
      },
    },
    { new: true }
  ).select("-password");
  res.status(200).json(updatedUser);
});

/**
 * @desc get all users
 * @route /api/users
 * @method GET
 * @access private (only admin)
 */
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
});

/**
 * @desc get user with id
 * @route /api/users/:id
 * @method GET
 * @access private (only admin & user himself)
 */
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "user not found" });
  }
});

/**
 * @desc delete user with id
 * @route /api/users/:id
 * @method DELETE
 * @access private (only admin & user himself)
 */
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "user deleted succesfuly" });
  } else {
    res.status(404).json({ message: "user not found" });
  }
});

module.exports = {
  updateUser,
  getAllUsers,
  getUserById,
  deleteUser,
};
