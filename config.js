const {config} = require('dotenv');
const {env} = require('process');

config();

const {
    DATABASE_URL,
    BCRYPT_PASSWORD,
    SALT_ROUND,
    TOKEN_SECRET
} = env;

module.exports = {
    DATABASE_URL,
    BCRYPT_PASSWORD,
    SALT_ROUND,
    TOKEN_SECRET
};