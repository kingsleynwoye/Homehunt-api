const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register New User
router.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    // Simple Validation
    if (!name) {
        return res.status(400).json({ msg: "Please Enter Name" })
    }

    if (!email) {
        return res.status(400).json({ msg: "Please Enter your Email" })
    }

    if (!password) {
        return res.status(400).json({ msg: "Please Enter your Password" })
    }

    //Check User
    User.findOne({ email })
        .then(
            user => {
                if (user) return res.status(400).json({ msg: "User already exist" })

                const newUser = new User({
                    name,
                    email,
                    password
                });
                //Hash their password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw new err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                jwt.sign(
                                    { id: user.id },
                                    config.get('jwtSecret'),
                                    { expiresIn: 3600 },
                                    (err, token) => {
                                        if (err) throw err;
                                        res.json({
                                            token,
                                            user: {
                                                id: user.id,
                                                name: user.name,
                                                email: user.email,
                                                password: hash
                                            }
                                        })
                                    }
                                )
                            })
                    })
                })
            }
        )
})

// LOGIN 
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Simple Validation
    if (!email) {
        return res.status(400).json("Your email is required")
    }

    if (!password) {
        return res.status(400).json("Your passsword is required")
    }

    //Check existing User
    User.findOne({ email })
        .then(
            user => {
                if (!user) return res.status(400).json({ msg: "User Does not exist" })

                // Validate Password
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (!isMatch) return res.status(404).json({ msg: "User not found" })

                        jwt.sign(
                            { id: user.id },
                            config.get('jwtSecret'),
                            { expiresIn: 3600 },
                            (err, token) => {
                                if (err) throw err;
                                res.json({
                                    token,
                                    user: {
                                        id: user.id,
                                        name: user.name,
                                        email: user.email,
                                        password: user.password
                                    }
                                })
                            }
                        )
                    })
            }
        )
})
module.exports = router;