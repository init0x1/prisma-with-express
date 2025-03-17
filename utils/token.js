const jwt = require('jsonwebtoken');
const {TOKEN_SECRET} = require('../config');


const generateToken = async(user_email) => {
    return jwt.sign({ user_email }, TOKEN_SECRET, { expiresIn: '1h' });
}

module.exports = { generateToken };