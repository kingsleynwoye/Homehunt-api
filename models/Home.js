const mongoose = require("mongoose");

const HomeSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    desc: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    }
})

module.exports = mongoose.model("Home", HomeSchema)