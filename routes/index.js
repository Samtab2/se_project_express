const router = require("express").Router();
const clothingItemsRouter = require("./clothingItems");
const userRouter = require("./users");
const { NOT_FOUND } = require("../utlis/errors");
const { loginUser, createUser } = require("../controllers/users");
const authorizationMiddleware = require("../middleware/auth");

router.use("/items", clothingItemsRouter);
router.use("/users", authorizationMiddleware, userRouter);
router.post("/signin", loginUser);
router.post("/signup", createUser);

router.use((req, res) => res.status(NOT_FOUND.code).send(NOT_FOUND.text));

module.exports = router;
