const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const User = require('../models/user');
const Post = require('../models/post');


//get all users
router.get('/users', async (req, res) => {
    const schema = Joi.object({
        pageSize: Joi.number().integer().positive().max(100).default(10),
        pageNumber: Joi.number().integer().min(0).default(0),
    });
    let { error, value } = schema.validate(req.query);
    if (error) {
        return res.status(422).json(error.message);
    }
    let count = await User.estimatedDocumentCount();
    let pages = Math.ceil( count / value.pageSize );
    if (value.pageSize * value.pageNumber >= count) {
        return res.status(404).json(`there's only ${pages} pages with ${value.pageSize} records per page`);
    }
    let users = await User.find({});
    // .skip(value.pageSize * value.pageNumber)
    // .limit(value.pageSize);

    res.json({
        metadata: {
            pages,
            pageNumber: value.pageNumber,
            pageSize: value.pageSize
        },
        data: users
    });
});

//get all posts
router.get('/posts', async (req, res) => {
    const schema = Joi.object({
        pageSize: Joi.number().integer().positive().max(100).default(10),
        pageNumber: Joi.number().integer().min(0).default(0),
    });
    let { error, value } = schema.validate(req.query);
    if (error) {
        return res.status(422).json(error.message);
    }
    let count = await Post.estimatedDocumentCount();
    let pages = Math.ceil( count / value.pageSize );
    if (value.pageSize * value.pageNumber >= count) {
        return res.status(404).json(`there's only ${pages} pages with ${value.pageSize} records per page`);
    }
    let posts = await Post.find({})
    .sort({'date': -1})
    .skip(value.pageSize * value.pageNumber)
    .limit(value.pageSize);

    res.json({
        metadata: {
            pages,
            pageNumber: value.pageNumber,
            pageSize: value.pageSize
        },
        data: posts
    });
});

module.exports = router;