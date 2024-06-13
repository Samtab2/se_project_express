const router = require("express").Router();
const clothingItemsRouter = require("./clothingItems");
const userRouter = require("./users");
const { loginUser, createUser } = require("../controllers/users");
const authorizationMiddleware = require("../middleware/auth");
const NotFoundError = require("../errors/not-found-err");
const {
  validateUserBody,
  validateUserLogin,
} = require("../middleware/validation");

router.use("/items", clothingItemsRouter);
router.use("/users", authorizationMiddleware, userRouter);
router.post("/signin", validateUserLogin, loginUser);
router.post("/signup", validateUserBody, createUser);

router.use(() => {
  throw new NotFoundError("Not found");
});

module.exports = router;
