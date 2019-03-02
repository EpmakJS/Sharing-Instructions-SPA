const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const post = require('../models/post');

const db = "mongodb+srv://viktor123:viktor123@devcluster-ioeqz.mongodb.net/MyTermProject?retryWrites=true";

mongoose.Promise = global.Promise;
mongoose.connect(db,{useNewUrlParser: true}, function(err) {
    if(err) {
        console.log('Connection error');
    }
});

router.get('/posts', function(req, res) {
    console.log('Requesting posts');
    post.find({})
        .exec(function(err, posts) {
            if (err) {
                console.log('Error getting the posts');
            } else {
                res.json(posts);
            }
        });
});

router.get('/details/:id', function(req, res) {
    console.log('Requesting post');
    post.findById(req.params.id)
        .exec(function(err, post) {
            if (err) {
                console.log('Error getting the post');
            } else {
                res.json(post);
            }
        });
});

router.post('/posts', function(req, res) {
    console.log('Posting a post');
    var newPost = new post();
    newPost.title = req.body.title;
    newPost.description = req.body.description;
    newPost.save(function(err, addedPost) {
        if (err) {
            console.log('Error inserting the post');
        } else {
            res.json(addedPost);
        }
    });
});


module.exports = router;