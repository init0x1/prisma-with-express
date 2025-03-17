const express = require('express');
const {validateNewUserData} = require('../middlewares/validatior');
const {createUser} = require('../controllers/user.controller');


const userRouter = express.Router();

userRouter.post('/',validateNewUserData,createUser);

module.exports = userRouter;