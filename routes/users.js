const router = require("express").Router();
const { getUsers, createUser } = require("../controllers/users");

router.get("/", getUsers);
router.get("/:userId", () => console.log("GET users by ID"));
router.post("/", createUser);

router.use((req, res) => {
    res.status(500).send({ message: "Router not Found" });
})

module.exports = router;