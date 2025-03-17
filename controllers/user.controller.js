const express = require('express');
const User = require('../models/user.model.js');
const AppError = require('../utils/AppError');
const { passwordHashing } = require('../utils/hashing');
const { generateToken } = require('../utils/token');

const userModel = new User();


const createUser = async (req, res,next) => {
    try {

        const { name, email, password } = req.body;
        const hashedPassword = await passwordHashing(password);
        const newUser = await userModel.createUser(name, email, hashedPassword);
        
        newUser.password = undefined;

        return res.status(201).json({ 
            status: 'success',
            data: { user: newUser }
        });
    } catch (error) {
        next(error);
    }
}

const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.authUser(email, password);
        if(user){
            const token = await generateToken(user.email);
            return res.status(200).json({ 
                status: 'success',
                data: { token, token }
            });
        }
        
    } catch (error) {
        next(error);
    }
}

module.exports = {createUser,userLogin};
