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

    async getAllPosts(){
        try{
            const posts = await prisma.post.findMany(
                {
                    include:{
                        author:{
                            select:{
                                id:true,
                                name:true,
                            }
                        }
                    }
                }
            );
            if(!posts){
                return null;
            }
            return posts;
        }catch(error){
            throw new AppError('Error getting all posts', 500, error);
        }
    }

    async getPostById(postId){
        try{
            
            const post = await prisma.post.findUnique({
                where: {
                    id: postId
                },include:{
                    author:{
                        select:{
                            id:true,
                            name:true,
                        }
                    }
                }
            });
            if(!post){
                return null;
            }
            return post;
        }catch(error){
            throw new AppError('Error getting post by id', 500, error);
        }
    }

    // get post by author id
    async getPostsByAuthorId(authorId){
        try{
            const posts = await prisma.post.findMany({
                where:{
                    authorId:authorId
                },
                include:{
                    author:{
                        select:{
                            id:true,
                            name:true,
                        }
                    }
                }
            });
           return posts;
        }catch(error){
            throw new AppError('Error getting post by author id', 500, error);
        }
    }
}
module.exports = Post;