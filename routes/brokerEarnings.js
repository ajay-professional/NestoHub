const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();
const authentication = require('../middlewares/jwtToken');
const brokerEarningsController = require('../controllers/brokerEarningsController');
const { addBrokerEarnings, updateBrokerEarnings, id, filters} = require('../validation/brokerEarnings.js');

router.post( '/addBrokerEarnings', authentication, validator.body(addBrokerEarnings), brokerEarningsController.addBrokerEarnings);
router.put('/updateBrokerEarnings', authentication, validator.body(updateBrokerEarnings),brokerEarningsController.updateBrokerEarnings);
router.delete('/deleteBrokerEarnings', authentication,validator.query(id),brokerEarningsController.deleteBrokerEarnings);
router.get('/getAllBrokerEarnings', authentication, validator.query(filters), brokerEarningsController.getAllBrokerEarnings);
router.get('/getBrokerEarningsById', authentication, validator.query(id), brokerEarningsController.getBrokerEarningsById);

module.exports = router;