const joi = require('joi');
const AppError = require('../../utils/AppError');

// Create new Post schema
const newPostSchema = joi.object({
    title: joi.string().trim().min(8).max(100).required()
        .messages({
            'string.min': 'Title must be at least 8 characters',
            'any.required': 'Title is required',
        }),
    content: joi.string().trim().min(8).max(1000).required()
        .messages({
            'string.min': 'Content must be at least 8 characters',
            'any.required': 'Content is required',
        }),
});

// Validate new Post data middleware
const validateNewPostData = (req, res, next) => {
    try {
        const { error } = newPostSchema.validate(req.body, { abortEarly: false });

        if (error) {
            const errorMessages = error.details.map((detail) => detail.message);
            throw new AppError('Invalid input data', 400, errorMessages);
        }

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { validateNewPostData };