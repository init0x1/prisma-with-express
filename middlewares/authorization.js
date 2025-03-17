const { verifyToken } = require('../utils/token');
const AppError = require('../utils/AppError');
const prisma = require('../lib/prisma'); 

const authorizationMiddleware = async (req, res, next) => {
    try {

        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            throw new AppError('Authorization header is missing', 401);
        }

        const [scheme, jwtToken] = authorizationHeader.split(' ');
        if (scheme !== 'Bearer' || !jwtToken) {
            throw new AppError('Invalid authorization header format', 401);
        }

        // Verify the token
        const tokenData = await verifyToken(jwtToken);

        if (!tokenData.user_email) {
            throw new AppError('Unauthorized Access', 401);
        }

        const user = await prisma.user.findUnique({
            where: {
                email: tokenData.user_email,
            },
        });

        if (!user) {
            throw new AppError('The user associated with this token no longer exists', 401);
        }

        req.user = {
            id: user.id,
            email: user.email,
        };

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = authorizationMiddleware;