const express = require('express');
const {validateNewUserData,validateUserLoginData} = require('../middlewares/validatior');
const {createUser,userLogin} = require('../controllers/user.controller');


const userRouter = express.Router();

userRouter.post('/',validateNewUserData,createUser);
userRouter.post('/login',validateUserLoginData,userLogin);

module.exports = userRouter;