const prisma = require('../lib/prisma');
const AppError = require('../utils/AppError');

class User {
    async createUser(name, email, password) {
        try {
            
            const emailExists = await this.emailExists(email);
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

    async emailExists(email) {
        try {
            const user = await prisma.user.findUnique({
                where: { email }
            });
            return !!user; 
        } catch (error) {
            throw new AppError('Error checking email', 500);
        }
    }
    

}

module.exports = User;