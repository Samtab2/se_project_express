const router = require("express").Router();
const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

// Get
router.get("/", getItems);

// Post
router.post("/", createItem);

// Delete
router.delete("/:itemId", deleteItem);

// like
router.put("/:itemId/likes", likeItem);

// dislike
router.delete("/:itemId/likes", dislikeItem);

module.exports = router;
