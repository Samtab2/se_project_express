const router = require("express").Router();
const {
  addItem,
  getItems,
  deleteItem,
  addLike,
  removeLike,
} = require("../controllers/clothingItems");

const authorizationMiddleware = require("../middleware/auth");

// Get
router.get("/", getItems);

// Post
router.post("/", authorizationMiddleware, addItem);

// Delete
router.delete("/:itemId", authorizationMiddleware, deleteItem);

// like
router.put("/:itemId/likes", authorizationMiddleware, addLike);

// dislike
router.delete("/:itemId/likes", authorizationMiddleware, removeLike);

module.exports = router;
