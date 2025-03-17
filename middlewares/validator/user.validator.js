const joi = require('joi');
const AppError = require('../../utils/AppError');

// create new user schema
const newUserSchema = joi.object({
    name: joi.string().trim().min(2).max(100).required()
        .messages({
            'string.min': 'Name must be at least 2 characters',
            'any.required': 'Name is required'
        }),
    email: joi.string().email().trim().required()
        .messages({
            'string.email': 'Please provide a valid email address',
            'any.required': 'Email is required'
        }),
    password: joi.string().min(8).required()
        .messages({
            'string.min': 'Password must be at least 8 characters',
            'any.required': 'Password is required'
        })
});

// Validate user data middleware
const validateNewUserData = (req, res, next) => {
    try {
        const { error } = newUserSchema.validate(req.body, { abortEarly: false });

        if (error) {
            const errorMessages = error.details.map((detail) => detail.message);
            throw new AppError('Invalid input data', 400, errorMessages);
        }

        next();
    } catch (error) {
        next(error);
    }
};

// validate user login data
const userLoginSchema = joi.object({
    email: joi.string().email().trim().required()
        .messages({
            'string.email': 'Please provide a valid email address',
            'any.required': 'Email is required'
        }),
    password: joi.string().min(8).required()
        .messages({
            'string.min': 'Password must be at least 8 characters',
            'any.required': 'Password is required'
        })
});

const validateUserLoginData = (req, res, next) => {
    try {
        const { error } = userLoginSchema.validate(req.body, { abortEarly: false });

        if (error) {
            const errorMessages = error.details.map((detail) => detail.message);
            throw new AppError('Invalid input data', 400, errorMessages);
        }

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { validateNewUserData, validateUserLoginData };