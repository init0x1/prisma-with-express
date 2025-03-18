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

const getPostById = async (req, res,next) => {
    try {
        const  postId = parseInt(req.params.id);
        const post = await postModel.getPostById(postId);
        if(post===null){
            throw new AppError('Post not found', 404);
        }
        return res.status(200).json({ 
            status: 'success',
            data: { post }
        });
    }catch (error) {
        next(error);
    }
}

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



module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    getPostsByUser
};