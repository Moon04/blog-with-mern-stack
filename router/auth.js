const config = require('../config');
const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    res.send('index');
});

//sign up
router.post('/register', async (req, res) => {
    const userSchema = Joi.object({
        firstName: Joi.string().trim().required(),
        lastName: Joi.string().trim().required(),
        username: Joi.string().trim().required(),
        avatar: Joi.string().trim().required(),
        email: Joi.string().trim().required(),
        password: Joi.string().trim().min(4).required()
    });

    
    let { error, value } = userSchema.validate(req.body);
    if (error) {
        console.log(req.body);
        return res.status(422).json(error.message);
    }
    let user = value;

    let salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const newUser = new User(user);

    newUser.save((err, doc) => {
        if (err) {
            return res.status(409).json(`‘ser with username: ${user.username} already exist`);
        }
        doc = doc.toJSON();
        delete doc.password;
        const token = jwt.sign(doc, config.jwtSecret, {
            expiresIn: '30d' // 30 days
        });
        return res.json({
            data: {
                user: doc,
                token: 'JWT ' + token
            }
        });
    })

});

//signin
router.post('/authenticate', async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !email.trim() || !password || !password.trim()) {
        return res.status(422).json('email and password are required fields');
    }

    let user = await User.findOne({
        email
    }).select('+password');

    if(!user) {
        return res.status(404).json('No Such User');
    }

    user = user.toJSON();

    bcrypt.compare(password, user.password, (err, same) => {
        if (err || !same) {
            return res.status(406).json('Wrong Password');
        }
        delete user.password;
        const token = jwt.sign(user, config.jwtSecret, {
            expiresIn: '30d' // 30 days
        });
        return res.json({
            data: {
                user: user,
                token: 'JWT ' + token
            }
        });
    });
});

module.exports = router;
