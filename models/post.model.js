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

    async getPostWithComments(postId) {
        try {
            const post = await prisma.post.findUnique({
                where: {
                    id: postId
                },
                include: {
                    author: {
                        select: {
                            id: true,
                            name: true,
                        }
                    },
                    comments: {
                        include: {
                            author: {
                                select: {
                                    id: true,
                                    name: true,
                                }
                            }
                        },
                        orderBy: {
                            createdAt: 'desc'
                        }
                    }
                }
            });
    
            if (!post) {
                return null;
            }
    
            return post;
        } catch (error) {
            throw new AppError('Error getting post with comments', 500, error);
        }
    }

    // update post 
    async updatePost(postId,authorId,title,content){
        try {
            const post = await this.getPostById(postId);
            if(!post){
                throw new AppError('Post not found', 404);
            }
            
            if(post.authorId !== authorId){
                 throw new AppError('unauthorized', 401);
                }
            const updatedPost = await prisma.post.update({
                where:{
                    id:postId
                },
                data:{
                    title,
                    content
                }
            })
            return updatedPost;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;  
            }
            throw new AppError('Error updating post', 500, error);
        }
    }

    // delete post 
    async deletePost(postId,authorId){
        try {
            const post = await this.getPostById(postId);
            if(!post){
                throw new AppError('Post not found', 404);
            }
            
            if(post.authorId !== authorId){
                 throw new AppError('unauthorized', 401);
                }
            const deletedPost = await prisma.post.delete({
                where:{
                    id:postId
                }
            })
            return deletedPost;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;  
            }
            throw new AppError('Error deleting post', 500, error);
        }
    }

}




module.exports = Post;