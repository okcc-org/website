const jwt = require ('jsonwebtoken');
const { UnauthorizedError } = require('../utils/CustomError');
const config = require('../config/config');


exports.authenticateUser = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if(!token) {
        throw UnauthorizedError("No token provided");
    }
    jwt.verify(token, config.jwt.secret, (err, user) => {
        if (err) {
            throw UnauthorizedError("Invalid token");
        }
        req.user = user;
        next();
    });
};

exports.isAdmin = (req, res, next) => {
    if(req.user.role !== 'admin') {
        throw UnauthorizedError("You are not authorized to access this resource");
    }
    next();
};

