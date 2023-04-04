const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();
const authentication = require('../middlewares/jwtToken');
const notificationController = require('../controllers/notificationController');
const { filters} = require('../validation/notification');


router.get('/getAllNotification', authentication,  validator.query(filters), notificationController.getAllNotification);

module.exports = router;