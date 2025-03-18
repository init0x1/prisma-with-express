const jwt = require('jsonwebtoken');
const {TOKEN_SECRET} = require('../config');
const AppError = require('./AppError');

const generateToken = async(user_email) => {
    return jwt.sign({ user_email }, TOKEN_SECRET, { expiresIn: '1d' });
}

const verifyToken = async(token) => {
    try {
        return jwt.verify(token, TOKEN_SECRET);
    } catch (error) {
        throw new AppError('invalid or expired token', 401);
    }
};


module.exports = { generateToken ,verifyToken};