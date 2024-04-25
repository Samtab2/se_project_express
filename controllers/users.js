const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const User = require("../models/user");

const { JWT_SECRET } = require("../utlis/config");

const {
  REQUEST_SUCCESSFUL,
  REQUEST_CREATED,
  INVALID_DATA,
  NOT_FOUND,
  SERVER_ERROR,
  CONFLICT,
  UNAUTHORIZED,
} = require("../utlis/errors");

// CREATE
const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  if (!email) {
    return res.status(INVALID_DATA.code).send({ message: "Email is required" });
  }

  // Check if email already exists
  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(CONFLICT.code).send(CONFLICT.text);
      }

      // If no existing user, create a new one
      return bcrypt.hash(password, 10);
    })
    .then((hashedPassword) =>
      User.create({ name, avatar, email, password: hashedPassword })
    )
    .then((user) =>
      res
        .status(REQUEST_CREATED)
        .send({ name: user.name, avatar: user.avatar, email: user.email })
    )
    .catch((err) => {
      console.error(err);

      if (err.code === 11000) {
        return res.status(CONFLICT.code).send(CONFLICT.text);
      }

      if (err.name === "ValidationError") {
        return res.status(INVALID_DATA.code).send(INVALID_DATA.text);
      }

      return res.status(SERVER_ERROR.code).send(SERVER_ERROR.text);
    });
  return null;
};

// GET
const getUser = (req, res) =>
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.status(REQUEST_SUCCESSFUL).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND.code).send(NOT_FOUND.text);
      }
      if (err.name === "CastError") {
        return res.status(INVALID_DATA.code).send(INVALID_DATA.text);
      }
      return res.status(SERVER_ERROR.code).send(SERVER_ERROR.text);
    });

// Login

const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(INVALID_DATA.code).send({
      message: "The email field is required",
    });
  }
  if (!password) {
    return res.status(INVALID_DATA.code).send({
      message: "The password field is required",
    });
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        return res
          .status(UNAUTHORIZED.code)
          .send({ message: "Incorrect email or password" });
      }

      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.status(REQUEST_SUCCESSFUL).send({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.message === "Wrong email or password") {
        return res.status(UNAUTHORIZED.code).send(UNAUTHORIZED.text);
      }
      return res.status(SERVER_ERROR.code).send(SERVER_ERROR.text);
    });
};

// UPDATE USER
const updateUser = (req, res) => {
  const { name, avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then(() => res.status(REQUEST_SUCCESSFUL).send({ name, avatar }))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(INVALID_DATA.code).send(INVALID_DATA.text);
      }
      return res.status(SERVER_ERROR.code).send({
        message: SERVER_ERROR.text,});
    });
};

module.exports = {
  createUser,
  getUser,
  loginUser,
  updateUser,
};
