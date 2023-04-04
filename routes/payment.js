const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();
const authentication = require('../middlewares/jwtToken');
const paymentController = require('../controllers/paymentController');
const { addPayment, updatePayment, id, filters} = require('../validation/payment');

router.post( '/addPayment', authentication, validator.body(addPayment), paymentController.addPayment);
router.put('/updatePayment', authentication, validator.body(updatePayment), paymentController.updatePayment);
router.delete('/deletePayment', authentication, validator.query(id),paymentController.deletePayment);
router.get('/getAllPayment', authentication,  validator.query(filters),paymentController.getAllPayment);// transaction page
router.get('/getPaymentById', authentication, validator.query(id), paymentController.getPaymentById);

module.exports = router;

