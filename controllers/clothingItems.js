const ClothingItem = require("../models/clothingItems");

// Create
const createItem = (req, res) => {
  console.log(req.body);
  console.log(req);

  const { name, weather, imageURL } = req.body;

  ClothingItem.create({ name, weather, imageURL })
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((err) => {
      res.status(404).send({ message: "Error from createItem", err });
    });
};

// Get
const getItems = (req, res) => {
  console.log(req.body);
  console.log(req);

  ClothingItem.find({})
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error from getItems", err });
    });
};

// Delete
const deleteItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndDelete(itemId)
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error from deleteItem", err });
    });
};

// Update
const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageURL } = req.body;
  ClothingItem.findByIdAndUpdate(itemId, {$set:{imageURL}}).orFail().then((item) => {
    res.status(200).send(item);
  })
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error from updateItem", err });
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  updateItem,
};
