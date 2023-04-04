const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();
const authentication = require('../middlewares/jwtToken');
const transactionController = require('../controllers/transactionController.js');
const { addTransaction, updateTransaction, id,filters} = require('../validation/transaction');

router.post( '/addTransaction', authentication, validator.body(addTransaction), transactionController.addTransaction);
router.put('/updateTransaction', authentication, validator.body(updateTransaction), transactionController.updateTransaction);
router.delete('/deleteTransaction',authentication,validator.query(id),transactionController.deleteTransaction);
router.get('/getTransaction', authentication,  validator.query(filters),transactionController.getTransaction);
router.get('/getTransactionById', authentication, validator.query(id), transactionController.getTransactionById);

module.exports = router;