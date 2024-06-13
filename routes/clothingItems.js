const router = require("express").Router();
const {
  addItem,
  getItems,
  deleteItem,
  addLike,
  removeLike,
} = require("../controllers/clothingItems");

const { validateCardBody, validateId } = require("../middleware/validation");

const authorizationMiddleware = require("../middleware/auth");

// Get
router.get("/", getItems);

// Post
router.post("/", authorizationMiddleware, validateCardBody, addItem);

// Delete
router.delete("/:itemId", authorizationMiddleware, validateId, deleteItem);

// like
router.put("/:itemId/likes", authorizationMiddleware, validateId, addLike);

// dislike
router.delete(
  "/:itemId/likes",
  authorizationMiddleware,
  validateId,
  removeLike
);

module.exports = router;
