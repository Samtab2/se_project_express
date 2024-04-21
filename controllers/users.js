const User = require("../models/user");
const {
  REQUEST_SUCCESSFUL,
  REQUEST_CREATED,
  INVALID_DATA,
  NOT_FOUND,
  SERVER_ERROR
} = require("../utlis/errors");

// GET /users

const getUsers = (req, res) => {
  User.find()
    .then((users) => res.status(REQUEST_SUCCESSFUL).send(users))
    .catch((err) => {
      console.error(err);
      return res.status(SERVER_ERROR.code).send(SERVER_ERROR.text);
    });
};

// CREATE
const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(REQUEST_CREATED).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(INVALID_DATA.code).send(INVALID_DATA.text);
      }
      return res.status(SERVER_ERROR.code).send(SERVER_ERROR.text);
    });
};
// GET
const getUser = (req, res) => 
  User.findById(req.params.userId)
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


module.exports = {
  getUsers,
  createUser,
  getUser,
};
