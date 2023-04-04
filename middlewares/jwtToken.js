const jwt = require('jsonwebtoken');
const env = require('../config');

const privateKey = env.JWTOKEN;
const { UnauthorisedMessage } = require('../helpers/sendResponse');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, privateKey);
        req.userData = decoded;
        next();
    } catch (error) {
        UnauthorisedMessage(res);
    }
};