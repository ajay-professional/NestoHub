const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();
const authentication = require('../middlewares/jwtToken');
const loanQueryHistoryController = require('../controllers/loanQueryHistoryController');
const { addLoanQueryHistory, updateLoanQueryHistory,filters,id } = require('../validation/loanQueryHistory');

router.post('/addLoanQueryHistory', authentication, validator.body(addLoanQueryHistory), loanQueryHistoryController.addLoanQueryHistory);
router.put('/updateLoanQueryHistory', authentication, validator.body(updateLoanQueryHistory), loanQueryHistoryController.updateLoanQueryHistory);
router.delete('/deleteLoanQueryHistory', authentication, validator.query(id), loanQueryHistoryController.deleteLoanQueryHistory);
router.get('/getAllLoanQueryHistory', authentication,validator.query(filters), loanQueryHistoryController.getAllLoanQueryHistory);
router.get('/getLoanQueryHistoryById', authentication, validator.query(id), loanQueryHistoryController.getLoanQueryHistoryById);
router.get('/loanQueryAnalysis',validator.query(id),loanQueryHistoryController.loanQueryAnalysis);

module.exports = router;