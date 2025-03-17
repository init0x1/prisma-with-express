const { hashSync,compareSync } = require('bcrypt');
const {BCRYPT_PASSWORD,SALT_ROUND} = require('../config');

const passwordHashing = async(plainTextPassword) => {
    const password_plus_pepper = plainTextPassword.concat(BCRYPT_PASSWORD)
  return hashSync(password_plus_pepper, parseInt(SALT_ROUND))
}

const passwordVerification = async(plainTextPassword, hashedPassword) => {
    const password_plus_pepper = plainTextPassword.concat(BCRYPT_PASSWORD)
    return await compareSync(password_plus_pepper, hashedPassword)
}

module.exports = { passwordHashing , passwordVerification };