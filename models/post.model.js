const prisma = require('../lib/prisma');
const AppError = require('../utils/AppError');

class Post{
    async createPost({title,content,authorId}){
        try {
            const newPost = await prisma.post.create({
                data: {
                    title,
                    content,
                    authorId
                }
            });
           
            return newPost;
            
        } catch (error) {
            throw new AppError('Error creating post', 500, error);
        }
    }
}

module.exports = Post;