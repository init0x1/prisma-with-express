const Comment = require('../models/comment.model.js');
const Post = require('../models/post.model.js');
const AppError = require('../utils/AppError');

const commentModel = new Comment();
const postModel = new Post();

const createComment = async (req, res, next) => {
    try {
        const { content } = req.body;
        const postId = parseInt(req.params.postId);
        const authorId = req.user.id;
        
        const post = await postModel.getPostById(postId);
        if (!post) {
            throw new AppError('Post not found', 404);
        }
        
        const newComment = await commentModel.createComment({
            content,
            postId,
            authorId
        });
        
        if (!newComment) {
            throw new AppError('Error creating comment', 500);
        }
        
        return res.status(201).json({
            status: 'success',
            data: { comment: newComment }
        });
    } catch (error) {
        next(error);
    }
};

// get all comments for a post 
const getAllComments = async (req, res, next) => {
    try {
        const postId = parseInt(req.params.postId);
        
        const post = await postModel.getPostById(postId);
        if (!post) {
            throw new AppError('Post not found', 404);
        }
        
        const comments = await commentModel.getAllCommentsByPostId(postId);
        
        return res.status(200).json({
            status: 'success',
            data: { comments }
        });
    } catch (error) {
        next(error);
    }
};


const getCommentById = async (req, res, next) => {
    try {
        const commentId = parseInt(req.params.id);
        const comment = await commentModel.getCommentById(commentId);
        
        if (!comment) {
            throw new AppError('Comment not found', 404);
        }
        
        return res.status(200).json({
            status: 'success',
            data: { comment }
        });
    } catch (error) {
        next(error);
    }
};

const updateComment = async (req, res, next) => {
    try {
        const commentId = parseInt(req.params.id);
        const authorId = req.user.id;
        const { content } = req.body;
        
        const updatedComment = await commentModel.updateComment(commentId, authorId, content);
        
        return res.status(200).json({
            status: 'success',
            data: { comment: updatedComment }
        });
    } catch (error) {
        next(error);
    }
};

const deleteComment = async (req, res, next) => {
    try {
        const commentId = parseInt(req.params.id);
        const userId = req.user.id;
        
        const deletedComment = await commentModel.deleteComment(commentId, userId);
        
        return res.status(200).json({
            status: 'success',
            data: { comment: deletedComment }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createComment,
    getAllComments,
    getCommentById,
    updateComment,
    deleteComment
};