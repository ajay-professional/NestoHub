const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();
const authentication = require('../middlewares/jwtToken');
const termsAndConditionsBrokerController = require('../controllers/termsAndConditionsBrokerController.js');
const { addTermsAndConditionsBroker, updateTermsAndConditionsBroker, id,filters} = require('../validation/termsAndConditionsBroker');

router.post( '/addTermsAndConditionsBroker', authentication, validator.body(addTermsAndConditionsBroker), termsAndConditionsBrokerController.addTermsAndConditionsBroker);
router.put('/updateTermsAndConditionsBroker', authentication, validator.body(updateTermsAndConditionsBroker), termsAndConditionsBrokerController.updateTermsAndConditionsBroker);
router.delete('/deleteTermsAndConditionsBroker',authentication,validator.query(id),termsAndConditionsBrokerController.deleteTermsAndConditionsBroker);
router.get('/getAllTermsAndConditionsBroker', authentication,  validator.query(filters),termsAndConditionsBrokerController.getAllTermsAndConditionsBroker);
router.get('/getTermsAndConditionsBrokerById', authentication, validator.query(id), termsAndConditionsBrokerController.getTermsAndConditionsBrokerById);

module.exports = router;