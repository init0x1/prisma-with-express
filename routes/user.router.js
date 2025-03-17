const express = require('express');
const {validateNewUserData,validateUserLoginData} = require('../middlewares/validator/user.validator');
const {createUser,userLogin} = require('../controllers/user.controller');


const userRouter = express.Router();

userRouter.post('/',validateNewUserData,createUser);
userRouter.post('/login',validateUserLoginData,userLogin);

module.exports = userRouter;