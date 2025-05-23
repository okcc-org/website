const authController = require('./authController');
const subscribeController = require('./subscribeController');

module.exports = {
    ...authController,
    ...subscribeController
};


