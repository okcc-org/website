require('dotenv').config();

module.exports = {
    // server config
    server: {
        port: process.env.PORT || 8080,
    },

    // JWT config
    jwt: {
        secret: process.env.JWT_SECRET || 'secret-key',
        expiresIn: process.env.JWT_EXPIRES_IN || '24h'
    },

    // CORS config
    cors: {
        origin: process.env.CORS_ORIGIN || '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    },

};
