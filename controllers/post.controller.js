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



module.exports = {createPost};