const express = require('express');
const { createComment, getAllComments, getCommentById, updateComment, deleteComment } = require('../controllers/comment.controller');

const commentRouter = express.Router();


commentRouter.post('/posts/:postId/comments', createComment);
commentRouter.get('/posts/:postId/comments', getAllComments);

commentRouter.get('/comments/:id', getCommentById);
commentRouter.patch('/comments/:id', updateComment);
commentRouter.delete('/comments/:id', deleteComment);

module.exports = commentRouter;