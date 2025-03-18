const Post = require('../models/post.model.js');
const AppError = require('../utils/AppError');


const postModel = new Post();

const createPost = async (req, res,next) => {
    try {

        const { title, content } = req.body;
        const newPost = await postModel.createPost({
            title,
            content,
            authorId: req.user.id
        });
        
        if(!newPost){
            throw new AppError('Error creating post', 500);
        }
        
        return res.status(201).json({ 
            status: 'success',
            data: { post: newPost }
        });

    }catch (error) {
        next(error);
    }
}

const getAllPosts = async (req, res,next) => {
    try {
        const posts = await postModel.getAllPosts();
        if(posts===null){
            throw new AppError('there is no Posts to show', 404);
        }
        return res.status(200).json({ 
            status: 'success',
            data: { posts }
        });
    }catch (error) {
        next(error);
    }
}

const getPostById = async (req, res, next) => {
    try {
        const postId = parseInt(req.params.id);
        
        const post = await postModel.getPostWithComments(postId);
        
        if (post === null) {
            throw new AppError('Post not found', 404);
        }
        
        const commentCount = post.comments.length;
        
        return res.status(200).json({
            status: 'success',
            data: {
                post,
                commentCount
            }
        });
    } catch (error) {
        next(error);
    }
};

const getPostsByUser = async (req, res, next) => {
    try {
        const authorId = req.user.id; 
        const posts = await postModel.getPostsByAuthorId(authorId);
        if (posts === null) {
            throw new AppError('There are no posts to show', 404);
        }
        return res.status(200).json({
            status: 'success',
            data: { posts },
        });
    } catch (error) {
        next(error);
    }
};

const updatePost = async (req,res,next)=>{
    try {
        const postId = parseInt(req.params.id);
        const authorId = req.user.id;
        const { title, content } = req.body;
        const updatedPost = await postModel.updatePost(postId,authorId,title,content);
        if(!updatedPost){
            throw new AppError('Error updating post', 404);
        }
        return res.status(200).json({
            status: 'success',
            data: { updatedPost }
        });
    } catch (error) {
        next(error);
    }
}

const deletePost = async (req,res,next)=>{
    try {
        const postId = parseInt(req.params.id);
        const authorId = req.user.id;
        const deletedPost = await postModel.deletePost(postId,authorId);
        if(!deletedPost){
            throw new AppError('Error deleting post', 404);
        }
        return res.status(200).json({
            status: 'success',
            data: { deletedPost }
        });
    } catch (error) {
        next(error);
    }
}


module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    getPostsByUser,
    updatePost,
    deletePost
};