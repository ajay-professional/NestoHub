const express = require('express');
const validator = require('express-joi-validation').createValidator({});
const router = express.Router();
const adminController = require('../controllers/adminController');
const { login } = require('../validation/admin');

router.post('/login', validator.body(login), adminController.login);

module.exports = router;
