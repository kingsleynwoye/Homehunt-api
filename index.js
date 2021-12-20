const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require('config')
const cors = require('cors');

const auth = require("./routes/auth");
const post = require("./routes/post");

const db = config.get('mongoURL');

mongoose.connect((db),
    { useNewUrlParser: true, useUnifiedTopology: true }, () => {
        console.log('connected to MongoDB')
    });

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

app.use("/api/auth", auth);
app.use("/api/post", post);

app.listen(8000, () => {
    console.log("Backend server is running!")
});