const express = require('express');
const authorizationMiddleware = require('../middlewares/authorization');
const userRouter = require('./user.router');
const postRouter = require('./post.router');
const commentRouter = require('./comment.router');

const router = express.Router();

router.use('/users',userRouter);
router.use('/posts',authorizationMiddleware,postRouter);
router.use('/',authorizationMiddleware,commentRouter);

module.exports = router;