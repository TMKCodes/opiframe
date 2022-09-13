import express from 'express';

let router = express.Router();

let database = [];
let id = 0;

router.get('/shopping', (req, res) => {
    return res.status(200).json(database);
});

router.post('/shopping', (req, res) => {
    let item = {
        id: id++,
        type: req.body.type,
        count: req.body.count,
        price: req.body.price
    }
    database.push(item);
    return res.status(200).json(item);
});

router.put("/shopping/:id", (req, res) => {
    let item = database.find(item => item.id === parseInt(req.params.id));
    if (!item) {
        return res.status(404).send("The item with the given ID was not found.");
    }
    item.type = req.body.type;
    item.count = req.body.quantity;
    item.price = req.body.price;
    return res.status(200).json(item);
});

router.delete("/shopping/:id", (req, res) => {
    let id = parseInt(req.params.id);
    let index = database.findIndex(item => item.id === id);
    if (index == -1) {
        return res.status(404).json({ error: "Item not found" });
    }
    database.splice(index, 1);
    return res.status(200).json({ message: "Item deleted" });
});

export default router;