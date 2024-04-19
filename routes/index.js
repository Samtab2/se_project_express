const router = require("express").Router();
const clothingItems = require("./clothingItems");

router.use("/items", clothingItems);

router.use((req, res) => {
  res.status(404).send({ message: "Router not Found" });
});


const userRouter = require("./users");

router.use("/users", userRouter);

module.exports = router;
