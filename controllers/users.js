const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const User = require("../models/user");

const { JWT_SECRET } = require("../utlis/config");

const {
  REQUEST_SUCCESSFUL,
  REQUEST_CREATED,
  INVALID_DATA,
  NOT_FOUND,
  CONFLICT,
  UNAUTHORIZED,
} = require("../utlis/errors");

const NotFoundError = require("../errors/not-found-err");
const BadRequestError = require("../errors/bad-request-err");
const ConflictError = require("../errors/conflict-err");
const UnthorizedError = require("../errors/unauthorized-err");

// CREATE
const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  if (!email) {
    throw new BadRequestError({ message: "Email or password is invalid" });
  }

  // If no existing user, create a new one
  return bcrypt
    .hash(password, 10)

    .then((hashedPassword) =>
      User.create({ name, avatar, email, password: hashedPassword })
    )
    .then((newUser) =>
      res.status(REQUEST_CREATED).send({
        name: newUser.name,
        avatar: newUser.avatar,
        email: newUser.email,
      })
    )
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        throw new BadRequestError(INVALID_DATA.text);
      }
      if (err.code === 11000) {
        throw new ConflictError(CONFLICT.text);
      } else {
        next(err);
      }
    });
};

// GET
const getUser = (req, res, next) =>
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.status(REQUEST_SUCCESSFUL).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        throw new NotFoundError(NOT_FOUND.text);
      }
      if (err.name === "CastError") {
        throw new BadRequestError(INVALID_DATA.text);
      } else {
        next(err);
      }
    });

// Login

const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    throw new BadRequestError({
      message: "The email field is required",
    });
  }
  if (!password) {
    throw new BadRequestError({
      message: "The password field is required",
    });
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new UnthorizedError({ message: "Incorrect email or password" });
      }

      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.status(REQUEST_SUCCESSFUL).send({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.message === "Incorrect email or password") {
        throw new UnthorizedError(UNAUTHORIZED.text);
      } else {
        next(err);
      }
    });
};

// UPDATE USER
const updateUser = (req, res, next) => {
  const { name, avatar, _id } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    { name, avatar, _id },
    { new: true, runValidators: true }
  )
    .then((user) => res.status(REQUEST_SUCCESSFUL).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        throw new BadRequestError(INVALID_DATA.text);
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  getUser,
  loginUser,
  updateUser,
};
