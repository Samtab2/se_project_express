const router = require("express").Router();
const { getUser, updateUser } = require("../controllers/users");

router.get("/:userId", getUser);

router.patch("/", updateUser);

module.exports = router;
