const ClothingItem = require("../models/clothingItems");
const { REQUEST_SUCCESSFUL, REQUEST_CREATED } = require("../utlis/errors");

const NotFoundError = require("../errors/not-found-err");
const BadRequestError = require("../errors/bad-request-err");
const ForbiddenError = require("../errors/forbidden-err");

// Create
const addItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(REQUEST_CREATED).send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        next(new BadRequestError("The data is invalid"));
      } else {
        next(err);
      }
    });
};
// Get
const getItems = (req, res, next) => {
  ClothingItem.find()
    .then((item) => res.status(REQUEST_SUCCESSFUL).send(item))
    .catch((err) => {
      console.error(err);
      next(err);
    });
};

// Delete
const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        return next(
          new ForbiddenError("You are not authorized to delete this item")
        );
      }
      return item.deleteOne().then(() => res.send({ message: "Item deleted" }));
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Not found"));
      }
      if (err.name === "CastError")
        next(new BadRequestError("The data is invalid"));
      next(err);
    });
};

// like
const addLike = (req, res, next) => {
  console.log("Item ID received: ", req.params.itemId);
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      next(new NotFoundError("Not found"));
    })
    .then((item) => res.status(REQUEST_SUCCESSFUL).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError")
        next(new BadRequestError("The data is invalid"));
      next(err);
    });
};

// Dislike
const removeLike = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      next(new NotFoundError("Not found"));
    })
    .then((item) => res.status(REQUEST_SUCCESSFUL).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError")
        next(new BadRequestError("The data is invalid"));
      next(err);
    });
};

module.exports = {
  addItem,
  getItems,
  deleteItem,
  addLike,
  removeLike,
};
