const router = require("express").Router();
const clothingItemsRouter = require("./clothingItems");
const userRouter = require("./users");
const { NOT_FOUND } = require("../utlis/errors");
const { loginUser, createUser } = require("../controllers/users");
const authorizationMiddleware = require("../middleware/auth");
const { NotFoundError } = require("../errors/not-found-err");

router.use("/items", clothingItemsRouter);
router.use("/users", authorizationMiddleware, userRouter);
router.post("/signin", loginUser);
router.post("/signup", createUser);

router.use(() => new NotFoundError(NOT_FOUND.text));


module.exports = router;
