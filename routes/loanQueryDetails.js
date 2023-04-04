const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();
const authentication = require('../middlewares/jwtToken');
const loanQueryDetailsController = require('../controllers/loanQueryDetailsController.js');
const { addLoanQueryDetails, updateLoanQueryDetails, updateDisbursementDetails, id,filters,updateLoanQueryStatus,updateDsaInLoanQueryByAdmin } = require('../validation/loanQueryDetails');

router.post('/addLoanQueryDetails', authentication, validator.body(addLoanQueryDetails), loanQueryDetailsController.addLoanQueryDetails);
router.put('/updateLoanQueryDetails', authentication, validator.body(updateLoanQueryDetails), loanQueryDetailsController.updateLoanQueryDetails);
router.delete('/deleteLoanQueryDetails', authentication, validator.query(id), loanQueryDetailsController.deleteLoanQueryDetails);
router.get('/getAllLoanQueryDetails', authentication,validator.query(filters), loanQueryDetailsController.getAllLoanQueryDetails);
router.get('/getLoanQueryDetailsById', authentication, validator.query(id), loanQueryDetailsController.getLoanQueryDetailsById);
router.put('/updateDisbursementDetails', authentication, validator.body(updateDisbursementDetails), loanQueryDetailsController.updateDisbursementDetails);
router.put('/updateLoanQueryStatus', authentication, validator.body(updateLoanQueryStatus), loanQueryDetailsController.updateLoanQueryStatus);
router.get('/getAllLoanQueryStatusByAdmin', authentication, loanQueryDetailsController.getAllLoanQueryStatusByAdmin);
router.put('/updateDsaInLoanQueryByAdmin', authentication, validator.body(updateDsaInLoanQueryByAdmin), loanQueryDetailsController.updateDsaInLoanQueryByAdmin);

module.exports = router;
