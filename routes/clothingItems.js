const router = require("express").Router();


const { createItem } = require("../controllers/clothingItems");

// Create
router.post("/", createItem);

router.use((req, res) => {
    res.status(500).send({ message: "Router not Found" });
})


module.exports = router