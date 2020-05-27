const express = require('express');
const router = express.Router();
const { isValidId } = require('../utils');
const User = require('../models/user');

//follow user
router.post('/follow', async (req, res) => {
    if(!isValidId(req.body.userId)) {
        return res.status(422).json('please enter a valid id');
    }
    let followedUser = await User.findById({
        _id: req.body.userId
    });
    if (!followedUser) {
        return res.status(404).json('no such user');
    }
    if (res.req.user._id == req.body.userId) {
        return res.status(417).json('you cant follow yourself');
    }
    let user = await User.findById(res.req.user._id);
    if (user.followings.includes(req.body.userId)) {
        return res.status(409).json('you already follow this user');
    }

    let following = await User.findById(req.body.userId);

    await user.updateOne({
        $push: {
            followings: req.body.userId
        }
    });

    await following.updateOne({
        $push: {
            followers: res.req.user._id
        }
    });

    user.followings.push(req.body.userId);
    following.followers.push(res.req.user._id);
    res.json({data: user});
});

//unfollow user
router.post('/unfollow', async (req, res) => {
    if(!isValidId(req.body.userId)) {
        return res.status(422).json('please enter a valid id');
    }
    let unfollowedUser = await User.findById({
        _id: req.body.userId
    });
    if(!unfollowedUser) {
        return res.status(404).json('no such user');
    }
    let user = await User.findById(res.req.user._id);
    if (!user.followings.includes(req.body.userId)) {
        return res.status(409).json('you don\'t follow this user');
    }

    let following = await User.findById(req.body.userId);

    await user.updateOne({
        $pull: {
            followings: req.body.userId
        }
    });

    await following.updateOne({
        $pull: {
            followers: res.req.user._id
        }
    });

    user.followings = user.followings.filter(e => e != req.body.userId);
    following.followers = user.followings.filter(e => e != res.req.user._id);

    res.json({data: user});
});

//get current user info
router.get('/info', async (req, res) => {
    if(!isValidId(res.req.user._id)) {
        return res.status(422).json('please enter a valid id');
    }
    let user = await User.find({
        _id: res.req.user._id
    });

    if(!user) {
        return res.status(404).json('no such user');
    }
    res.json({data: user});
});

//get user info
router.get('/info/:id', async (req, res) => {
    if(!isValidId(req.params.id)) {
        return res.status(422).json('please enter a valid id');
    }
    let user = await User.find({
        _id: req.params.id
    });

    if(!user) {
        return res.status(404).json('no such user');
    }

    res.json({data: user});
});

module.exports = router;
