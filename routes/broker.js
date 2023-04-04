const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();
const authentication = require('../middlewares/jwtToken');
const brokerController = require('../controllers/brokerController');
const { sendOtp, verifyOtp, registerName, registerFromReferal, updatePersonalInfo, updateBankInfo, updatePreferences, filters, id } = require('../validation/broker');

router.post('/sendOtp', validator.body(sendOtp), brokerController.sendOtp);
router.post('/verifyOtp', validator.body(verifyOtp), brokerController.verifyOtp);
router.post('/resendOtp', validator.body(sendOtp), brokerController.resendOtp);
router.post('/registerName', validator.body(registerName), brokerController.registerName);
router.post('/registerFromReferal', validator.body(registerFromReferal), brokerController.registerFromReferal);
router.put('/updatePersonalInfo', validator.body(updatePersonalInfo), authentication, brokerController.updatePersonalInfo);
router.put('/updateBankInfo', validator.body(updateBankInfo), authentication, brokerController.updateBankInfo);
router.put('/updatePreferences', validator.body(updatePreferences), authentication, brokerController.updatePreferences);
// router.delete('/deleteBroker', validator.query(id), brokerController.deleteBroker);
router.get('/getAllBroker', validator.query(filters), brokerController.getAllBroker);
router.get('/getBrokerById', validator.query(id), brokerController.getBrokerById);

// router.get('/getBrokerById',  validator.query(filters), authentication, brokerController.getBrokerById);

module.exports = router;
