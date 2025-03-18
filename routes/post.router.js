const express = require('express');
const {validateNewPostData} = require('../middlewares/validator/post.validator');
const {createPost,getAllPosts,getPostById,getPostsByUser,updatePost,deletePost} = require('../controllers/post.controller');

const postRouter = express.Router();

postRouter.get('/',getAllPosts);
postRouter.get('/me',getPostsByUser);
postRouter.get('/:id',getPostById);
postRouter.post('/',validateNewPostData,createPost);
postRouter.put('/:id',updatePost);
postRouter.delete('/:id',deletePost);

module.exports = postRouter;
