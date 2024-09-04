const asyncHandler = require("express-async-handler");
const {
  User,
  validateLoggingUsers,
  validateNewUsers,
} = require("../models/User");
const bcrypt = require("bcryptjs");

/**
 * @desc regester new user
 * @route /api/auth/register
 * @method POST
 * @access public
 */

const registerUser = asyncHandler(async (req, res) => {
  const { error } = validateNewUsers(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ message: "this user already registerd" });
  }

  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);

  user = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
  });
  const result = await user.save();
  const token = user.genrateToken();
  const { password, ...other } = result._doc;
  res.status(201).json({ ...other, token });
});

/**
 * @desc loggin user
 * @route /api/auth/login
 * @method POST
 * @access public
 */
const logginUser = asyncHandler(async (req, res) => {
  const { error } = validateLoggingUsers(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: "invlid email or password" });
  }

  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordMatch) {
    return res.status(400).json({ message: "invlid email or password" });
  }

  const token = user.genrateToken();
  const { password, ...other } = user._doc;
  res.status(201).json({ ...other, token });
});

module.exports = {
  registerUser,
  logginUser
};
