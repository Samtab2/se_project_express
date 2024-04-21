const ClothingItem = require("../models/clothingItems");
const {
  REQUEST_SUCCESSFUL,
  REQUEST_CREATED,
  INVALID_DATA,
  NOT_FOUND,
  SERVER_ERROR,
} = require("../utlis/errors");

// Create
const createItem = (req, res) => {
  const { Name, Weather, ImageURL } = req.body;

  ClothingItem.create({ Name, Weather, ImageURL, user: req.user._id })
    .then((item) => res.status(REQUEST_CREATED).send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(INVALID_DATA.code).send(INVALID_DATA.text);
      }
      return res.status(SERVER_ERROR.code).send(SERVER_ERROR.text);
    });
};
// Get
const getItems = (req, res) => {
  ClothingItem.find()
    .then((item) => res.status(REQUEST_SUCCESSFUL).send(item))
    .catch((err) => {
      console.error(err);
      return res.status(SERVER_ERROR.code).send(SERVER_ERROR.text);
    });
};

// Delete
const deleteItem = (req, res) => {
  ClothingItem.findByIdAndDelete(req.params.itemId)
    .orFail()
    .then((item) => res.status(REQUEST_SUCCESSFUL).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND.code).send(NOT_FOUND.text);
      }
      if (err.name === "CastError")
        return res.status(INVALID_DATA.code).send(INVALID_DATA.text);

      return res.status(SERVER_ERROR.code).send(SERVER_ERROR.text);
    });
};

// like
const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item ID not found");
      error.statusCode = NOT_FOUND.code;
      throw error;
    })
    .then((item) => res.status(REQUEST_SUCCESSFUL).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError")
        return res.status(INVALID_DATA.code).send(INVALID_DATA.text);
      return res
        .status(err.statusCode || SERVER_ERROR.code)
        .send(err.message || SERVER_ERROR.text);
    });
};

// Dislike
const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item ID not found");
      error.statusCode = NOT_FOUND.code;
      throw error;
    })
    .then((item) => res.status(REQUEST_SUCCESSFUL).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError")
        return res.status(INVALID_DATA.code).send(INVALID_DATA.text);
      return res
        .status(err.statusCode || SERVER_ERROR.code)
        .send(err.message || SERVER_ERROR.text);
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
