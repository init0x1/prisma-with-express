const express = require('express');
const {validateNewPostData} = require('../middlewares/validator/post.validator');
const {createPost,getAllPosts,getPostById,getPostsByUser} = require('../controllers/post.controller');

const postRouter = express.Router();

postRouter.get('/',getAllPosts);
postRouter.get('/me',getPostsByUser);
postRouter.get('/:id',getPostById);
postRouter.post('/',validateNewPostData,createPost);

module.exports = postRouter;
