const ClothingItem = require("../models/clothingItems");




const createItem = (req, res) => {
     console.log(req.body);
     console.log(req)
 
    const { name, weather, imageURL } = req.body;

    ClothingItem.create({name, weather, imageURL}).then((item) => {
        console.log(item);
        res.send({data.item})
    }).catch((err) => {
        res.status(500).send({message: "Error from createIem", err})
    })
}

router.use((req, res) => {
    res.status(500).send({ message: "Router not Found" });
})

module.exports = {
    createItem
}