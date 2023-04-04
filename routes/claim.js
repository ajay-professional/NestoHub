const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();
const authentication = require('../middlewares/jwtToken');
const claimController = require('../controllers/claimController');
const { addClaim, updateClaim, id, filters, updateClaimStatusForBroker, getPropertiesEligibleForClaim } = require('../validation/claim');

router.post('/addClaim', authentication, validator.body(addClaim), claimController.addClaim);
router.put('/updateClaim', authentication, validator.body(updateClaim), claimController.updateClaim);
router.delete('/deleteClaim', authentication, validator.query(id), claimController.deleteClaim);
router.get('/getAllClaim', authentication,validator.query(filters), claimController.getAllClaim);
router.get('/getClaimById', authentication, validator.query(id), claimController.getClaimById);
router.get('/getAllEligibleClaims', authentication, validator.query(getPropertiesEligibleForClaim), claimController.getPropertiesEligibleForClaim);
router.put('/updateClaimStatusForBroker', authentication, validator.body(updateClaimStatusForBroker), claimController.updateClaimStatusForBroker);
module.exports = router;