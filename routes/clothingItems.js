const router = require("express").Router();
const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

const authorizationMiddleware = require("../middleware/auth");

// Get
router.get("/", getItems);

// Post
router.post("/", authorizationMiddleware, createItem);

// Delete
router.delete("/:itemId", authorizationMiddleware, deleteItem);

// like
router.put("/:itemId/likes", authorizationMiddleware, likeItem);

// dislike
router.delete("/:itemId/likes", authorizationMiddleware, dislikeItem);

module.exports = router;
