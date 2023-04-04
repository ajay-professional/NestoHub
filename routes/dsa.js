const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();
const authentication = require('../middlewares/jwtToken');
const dsaController = require('../controllers/dsaController');
const { sendOtp, verifyOtp, addDsa,updatePersonalInfo} = require('../validation/dsa');

router.post('/sendOtp', validator.body(sendOtp), dsaController.sendOtp);
router.post('/verifyOtp', validator.body(verifyOtp), dsaController.verifyOtp);
router.post('/resendOtp', validator.body(sendOtp), dsaController.resendOtp);
router.post('/addDsa', validator.body(addDsa), dsaController.addDsa);
router.put('/updatePersonalInfo',validator.body(updatePersonalInfo), dsaController.updatePersonalInfo);

module.exports = router;