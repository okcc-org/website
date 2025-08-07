const authController = require('./authController');
const subscribeController = require('./subscribeController');
const userController = require('./userController');

module.exports = {
    ...authController,
    ...subscribeController,
    ...userController
};


