const router = require("express").Router();
const { createItem } = require("../controllers/clothingItems");
const { getItems } = require("../controllers/clothingItems");
const { deleteItem } = require("../controllers/clothingItems");
const { updateItem } = require("../controllers/clothingItems");

// Get
router.get("/", getItems);

// Post
router.post("/", createItem);

// Delete
router.delete("/:itemId", deleteItem);

// Update
router.put("/:itemId", updateItem);

module.exports = router;
