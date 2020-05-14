const router = require('express').Router();
const Post = require('../models/post');

router.get('/', async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
});

router.get('/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.json(post);
});

router.post('/', async (req, res) => {
    
    // retrieve data from request 
    const { title, createdAt, tags, html } = req.body;
    console.log(title, createdAt, tags, html);

    //construct post schema
    const newPost = new Post({
        title,
        createdAt,
        tags,
        html
    });

    // save post
    try {
        const savedPost = await newPost.save();
        res.json(savedPost);
        console.log(savedPost);
    } catch (error) {
        console.error(error);
    }
});


module.exports = router;