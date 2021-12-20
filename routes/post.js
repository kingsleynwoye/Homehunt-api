const express = require('express');
const router = express.Router();
const Home = require('../models/Home');
const auth = require('../middleware/auth');

//CREATE NEW POST
router.post('/create', async (req, res) => {
    const newItem = await new Items({
        name: req.body.name,
        image: req.body.image,
        desc: req.body.desc,
        price: req.body.price,
    });
    newItem.save().then(Items => res.json(Items))
});

// GET ALL POSTS
router.get('/AllPosts', auth, async (req, res) => {
    await Items.find()
        .then(Items => res.json(Items))
});

// GET A SINGLE POST WITH DETAILS
router.get("/:id", auth, async (req, res) => {
    const post = await Home.findById(req.params.id);
    // try {
    //     // const post = await Home.findById(req.params.id);
    //     res.status(200).json(post);
    // } catch (err) {
    //     res.status(500).json(err);
    // }
});

module.exports = router;