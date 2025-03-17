const express = require('express');
const User = require('../models/user.model.js');
const AppError = require('../utils/AppError');

const userModel = new User();


const createUser = async (req, res,next) => {
    try {

        const { name, email, password } = req.body;
        const newUser = await userModel.createUser(name, email, password);
        
        newUser.password = undefined;

        return res.status(201).json({ 
            status: 'success',
            data: { user: newUser }
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {createUser};
