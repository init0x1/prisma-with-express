const prisma = require('../lib/prisma');
const AppError = require('../utils/AppError');

class Comment {
    async createComment({ content, postId, authorId }) {
        try {
            const newComment = await prisma.comment.create({
                data: {
                    content,
                    postId,
                    authorId
                }
            });
            
            return newComment;
        } catch (error) {
            throw new AppError('Error creating comment', 500, error);
        }
    }

    async getAllCommentsByPostId(postId) {
        try {
            const comments = await prisma.comment.findMany({
                where: {
                    postId
                },
                include: {
                    author: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });
            
            return comments;
        } catch (error) {
            throw new AppError('Error getting comments by post id', 500, error);
        }
    }

    async getCommentById(commentId) {
        try {
            const comment = await prisma.comment.findUnique({
                where: {
                    id: commentId
                },
                include: {
                    author: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    post: {
                        select: {
                            id: true,
                            title: true,
                            authorId: true
                        }
                    }
                }
            });
            
            if (!comment) {
                return null;
            }
            
            return comment;
        } catch (error) {
            throw new AppError('Error getting comment by id', 500, error);
        }
    }

    async updateComment(commentId, authorId, content) {
        try {
            const comment = await this.getCommentById(commentId);
            
            if (!comment) {
                throw new AppError('Comment not found', 404);
            }
            
            if (comment.authorId !== authorId) {
                throw new AppError('unauthorized', 401);
            }
            
            const updatedComment = await prisma.comment.update({
                where: {
                    id: commentId
                },
                data: {
                    content
                }
            });
            
            return updatedComment;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError('Error updating comment', 500, error);
        }
    }

    async deleteComment(commentId, userId) {
        try {
            const comment = await this.getCommentById(commentId);
            
            if (!comment) {
                throw new AppError('Comment not found', 404);
            }
            
            if (comment.authorId !== userId && comment.post.authorId !== userId) {
                throw new AppError('unauthorized', 401);
            }
            
            const deletedComment = await prisma.comment.delete({
                where: {
                    id: commentId
                }
            });
            
            return deletedComment;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError('Error deleting comment', 500, error);
        }
    }

    async countCommentsByPostId(postId) {
        try {
            const count = await prisma.comment.count({
                where: {
                    postId
                }
            });
            
            return count;
        } catch (error) {
            throw new AppError('Error counting comments', 500, error);
        }
    }
}

module.exports = Comment;