const jwt = require ('jsonwebtoken');
const { UnauthorizedError } = require('../utils/CutstomError');

exports.authenticateUser = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if(!token) {
        throw UnauthorizedError("No token provided");
    }
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, user) => {
        if (err) {
            throw UnauthorizedError("Invalid token");
        }
        req.user = user;
        next();
    });
};