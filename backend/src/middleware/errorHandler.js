const { ResponseUtil } = require('../utils/ResponseDTO');

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    return res.status(err.statusCode || 500).json(
        ResponseUtil.error(err.message)
    );
};

module.exports = errorHandler; 