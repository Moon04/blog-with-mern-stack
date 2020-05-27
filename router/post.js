const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const Joi = require('@hapi/joi');
const URL = require('url'); 
const { isValidId } = require('../utils');
const User = require('../models/user');
const Post = require('../models/post');


//upload posts' images
router.post('/upload', async (req, res) => {
    let file = req.file;
    let postId = req.body.postId;
    if (!file) return res.status(400).json('Please use form-data request body to upload file!');
    // add postId field in the form-data with the file upload
    if (!postId) return res.status(400).json('Please enter postId!');
    if(!isValidId(postId)) {
        return res.status(422).json('please enter a valid post id');
    }
    let post = await Post.findById(postId);
    if(!post) {
        return res.status(404).json('no such post');
    }
    if (post.userId != res.req.user._id) {
        return res.status(406).json('you are not allowed to edit this post');
    }
    const { originalname, buffer } = file;
    const ext = path.extname(originalname);
    // use public directory for files to be publicly accessible
    let postDir = path.join(__dirname, '../public/blog-upload', postId);
    if (!fs.existsSync(postDir)){
        fs.mkdirSync(postDir);
    }
    // use the same image name as there's one image per post
    fs.writeFileSync(path.join(postDir, `img${ext}`), buffer);
    // save file url based on the running host to support heroku deployment
    let fileUrl = URL.parse(`${req.protocol}://${req.headers.host}/blog-upload/${postId}/img${ext}`).href;
    await post.updateOne({ img: fileUrl});
    Object.assign(post, { img: fileUrl });
    res.json({data: post});
});

router.get('/search/:term', async (req, res) => {
    const schema = Joi.object({
        pageSize: Joi.number().integer().positive().max(100).default(10),
        pageNumber: Joi.number().integer().min(0).default(0),
    });
    let { error, value } = schema.validate(req.query);
    if (error) {
        return res.status(422).json(error.message);
    }
    let count = await Post.estimatedDocumentCount({
        $text:
        {
            $search: req.params.term
        }
    });
    let pages = Math.ceil( count / value.pageSize );
    if (value.pageSize * value.pageNumber >= count) {
        return res.status(404).json(`there's only ${pages} pages with ${value.pageSize} records per page`);
    }

    let posts = await Post.find({
        $text:
        {
            $search: req.params.term
        }
    }).sort({'date': 1})
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

//add new post
router.post('/', async (req, res) => {
    const schema = Joi.object({
        title: Joi.string().trim().required(),
        body: Joi.string().trim().required(),
        tags: Joi.array().items(Joi.string())
    });
    let { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(422).json(error.message);
    }
    let post = await Post.create({
        ...value,
        userId: res.req.user._id
    });
    res.json({data: post});
});

//edit post
router.put('/:id', async (req, res) => {
    if(!isValidId(req.params.id)) {
        return res.status(422).json('please enter a valid id');
    }
    let post = await Post.findById(req.params.id);
    if(!post) {
        return res.status(404).json('no such post');
    }
    console.log(post.userId);
    console.log(res.req.user._id);
    if (post.userId != res.req.user._id) {
        return res.status(406).json('you are not allowed to edit this post');
    }
    const schema = Joi.object({
        title: Joi.string().trim(),
        body: Joi.string().trim(),
        tags: Joi.array().items(Joi.string())
    }).or('title', 'body', 'tags');
    let { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(422).json(error.message);
    }
    await post.updateOne(value);
    Object.assign({ ...post }, value);
    res.json({data: post});
});

//delete post
router.delete('/:id', async (req, res) => {
    if(!isValidId(req.params.id)) {
        return res.status(422).json('please enter a valid id');
    }
    let post = await Post.findById(req.params.id);
    if(!post) {
        return res.status(404).json('no such post');
    }
    if (post.userId != res.req.user._id) {
        return res.status(406).json('you are not allowed to delete this post');
    }
    await Post.deleteOne({ _id: req.params.id});
    res.json({data: post});
});

//get followings' posts
router.get('/followingsposts', async (req, res) => {
    console.log("follow");
    const schema = Joi.object({
        pageSize: Joi.number().integer().positive().max(100).default(10),
        pageNumber: Joi.number().integer().min(0).default(0),
    });
    let { error, value } = schema.validate(req.query);
    if (error) {
        return res.status(422).json(error.message);
    }
    
    let user = await User.findById(res.req.user._id);
    let count = await Post.countDocuments({
        userId: {
            $in: user.followings
        }
    })
    let pages = Math.ceil( count / value.pageSize );

    let posts;
    if (value.pageSize * value.pageNumber >= count) {
        // return res.status(404).json(`there's only ${pages} pages with ${value.pageSize} records per page`);
        posts = [];
    }

    
    posts = await Post.find({
        userId: {
            $in: user.followings
        }
    })
    .skip(value.pageSize * value.pageNumber)
    .sort({'date': 1})
    .limit(value.pageSize)
    .populate('userId', 'username', 'User');

    res.json({
        metadata: {
            pages,
            pageNumber: value.pageNumber,
            pageSize: value.pageSize
        },
        data: posts
    });
});

//get user's posts
router.get('/userposts/:id', async (req, res) => {
    console.log("userposts");
    const schema = Joi.object({
            pageSize: Joi.number().integer().positive().max(100).default(10),
            pageNumber: Joi.number().integer().min(0).default(0),
        });
    let { error, value } = schema.validate(req.query);
    if (error) {
            return res.status(422).json(error.message);
        }

    let count = await Post.countDocuments({ userId: req.params.id });
    let pages = Math.ceil( count / value.pageSize );
    console.log(count);
    
    let posts;
    if (value.pageSize * value.pageNumber >= count) {
            // return res.status(404).json(`there's only ${pages} pages with ${value.pageSize} records per page`);
            posts=[];
    }

    else{
        posts = await Post.find({
                userId: req.params.id
            })
            .sort({'date': 1})
            .skip(value.pageSize * value.pageNumber)
            .limit(value.pageSize);
    }

    res.json({
        metadata: {
                postsCount: count,
                pages,
                pageNumber: value.pageNumber,
                pageSize: value.pageSize
            },
            data: posts
        });
    
    });
    
//get post
router.get('/:id', async (req, res) => {
    console.log("get post");
    if(!isValidId(req.params.id)) {
        return res.status(422).json('please enter a valid id');
    }
    let post = await Post.findById(req.params.id);
    if(!post) {
        return res.status(404).json('no such post');
    }
    console.log(post.userId);
    console.log(res.req.user._id);
    if (post.userId != res.req.user._id) {
        return res.status(406).json('you are not allowed to edit this post');
    }
    

    res.json({  data: post });
});

module.exports = router;
