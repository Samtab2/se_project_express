const router = require("express").Router();
const { getUser, updateUser } = require("../controllers/users");
const authorizationMiddleware = require("../middleware/auth");
const { validateUserUpdate } = require("../middleware/validation");

router.get("/me", authorizationMiddleware, getUser);

router.patch("/me", authorizationMiddleware, validateUserUpdate, updateUser);

module.exports = router;
