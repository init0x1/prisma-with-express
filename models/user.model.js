const prisma = require('../lib/prisma');
const AppError = require('../utils/AppError');
const { passwordVerification } = require('../utils/hashing');

class User {
    async createUser(name, email, password) {
        try {
            
            const emailExists = await this.getUserByEmail(email);
            if (emailExists) {
                throw new AppError('Email already exists', 400);
            }
                           
            const newUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    password
                }
            });
            
            return newUser;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError('Error creating user', 500);
        }
    }

    async getUserByEmail(email) {
        try {
            const user = await prisma.user.findFirst({
                where: {
                    email
                }
            });
            if (user) {
                return user;
            }else{
                return null;
            }
        } catch (error) {
            throw new AppError('Error checking email', 500);
        }
    }
    
    async authUser (email, password) {
        try {
            
            const user = await this.getUserByEmail(email);
            if(!user){
                throw new AppError('invalid credentials',400); 
            }
            const isPasswordValid = await passwordVerification(password, user.password);
            if(!isPasswordValid){
                throw new AppError('invalid credentials',400);
            }
            return user;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError('Error authenticating user', 500);   
        }
    }

}

module.exports = User;