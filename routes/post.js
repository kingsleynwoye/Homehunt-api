const express = require('express');
const router = express.Router();
const Items = require('../models/Home');
const auth = require('../middleware/auth');

//CREATE NEW Home
router.post('/create', (req, res,) => {
    const { name } = req.body;

    Items.findOne({ name })
        .then(
            name => {
                if (name) return res.status(400).json({ msg: "Home already exist,Please choose another name" })
                const newItem = new Items({
                    name: req.body.name,
                    image: req.body.image,
                    desc: req.body.desc,
                    price: req.body.price,
                });
                newItem.save().then(Items => res.json(Items))
            })
}
,);

// GET ALL HomeS
router.get('/AllHomes', async (req, res) => {
    await Items.find().then(Items => res.json(Items))
});

// GET A SINGLE Home WITH DETAILS
router.get("/:id", auth, async (req, res) => {
    try {
        const Home = await Items.findById(req.params.id);
        if (Home.id === req.params.id) {
            await Items.findOne()
            res.status(200).json(Home);
        }
    } catch (err) {
        res.status(400).json("Home does not exist");
    }
});

// DELETE A HOME
router.delete("/:id", auth, async (req, res) => {
    try {
        const Home = await Items.findById(req.params.id);
        if (Home.id === req.params.id) {
            await Home.deleteOne()
            res.status(200).json("The home has been deleted");
        }
    } catch (err) {
        res.status(400).json("Home has already been deleted");
    }
});

module.exports = router;
