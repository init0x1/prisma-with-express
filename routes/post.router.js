const express = require('express');
const {validateNewPostData} = require('../middlewares/validator/post.validator');
const {createPost} = require('../controllers/post.controller');

const postRouter = express.Router();

postRouter.post('/',validateNewPostData,createPost);

module.exports = postRouter;
