const router = require("express").Router();
const clothingItems = require("./clothingItems");
const userRouter = require("./users");
const { NOT_FOUND } = require("../utlis/errors")


router.use("/items", clothingItems);





router.use("/users", userRouter);

router.use((req, res) => res.status(NOT_FOUND.code).send(NOT_FOUND.text))



module.exports = router;



