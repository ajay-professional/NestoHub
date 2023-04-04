const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();
const authentication = require('../middlewares/jwtToken');
const builderController = require('../controllers/builderController');
const { sendOtp, verifyOtp,addShareYourIntern, registerName, enterBuilderDetails, updatePersonalInfo, raise, addBuilder, updateBuilder, id,filters,registerBuilder, addSubBuilder, updateSubBuilder} = require('../validation/builder');

router.post('/sendOtp', validator.body(sendOtp), builderController.sendOtp);
router.post('/verifyOtp', validator.body(verifyOtp), builderController.verifyOtp);
router.post('/resendOtp', validator.body(sendOtp), builderController.resendOtp);
router.post( '/addShareYourIntern', validator.body(addShareYourIntern), builderController.addShareYourIntern);

router.put('/updatePersonalInfo', validator.body(updatePersonalInfo), authentication, builderController.updatePersonalInfo);// builder profile

router.post('/addBuilder', authentication, validator.body(addBuilder), builderController.addBuilder);
router.post('/addSubBuilder', authentication, validator.body(addSubBuilder), builderController.addBuilder);
router.put('/updateSubBuilder', authentication, validator.body(updateSubBuilder), builderController.updateBuilder);
router.put('/updateBuilder', authentication, validator.body(updateBuilder), builderController.updateBuilder);
router.get('/getAllSubBuilder', authentication,validator.query(filters), builderController.getAllBuilder);
router.get('/getSubBuilderById', authentication, validator.query(id), builderController.getBuilderById);
router.delete('/deleteBuilder', authentication, validator.query(id), builderController.deleteBuilder);
router.delete('/deleteSubBuilder', authentication, validator.query(id), builderController.deleteBuilder);
router.get('/getAllBuilder', authentication,validator.query(filters), builderController.getAllBuilder);
router.get('/getBuilderById', authentication, validator.query(id), builderController.getBuilderById);
router.get('/getPropertyAnalytics', authentication, validator.query(id), builderController.getPropertyAnalytics);
router.get('/getPendingInvoice', authentication, validator.query(id), builderController.getPendingInvoice);


module.exports = router;