const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();
const authentication = require('../middlewares/jwtToken');
const invoiceController = require('../controllers/invoiceController');
const { addInvoice, updateInvoice, id, filters, updateStatusForInvoice} = require('../validation/invoice');

router.post( '/addInvoice', authentication, validator.body(addInvoice), invoiceController.addInvoice);
router.put('/updateInvoice', authentication, validator.body(updateInvoice), invoiceController.updateInvoice);
router.put('/updateStatusForInvoice', authentication, validator.body(updateStatusForInvoice), invoiceController.updateStatusForInvoice);
router.delete('/deleteInvoice', authentication, validator.query(id),invoiceController.deleteInvoice);
router.get('/getAllInvoiceForBuilder', authentication,  validator.query(filters),invoiceController.getAllInvoiceForBuilder);
router.get('/getAllInvoice', authentication,  validator.query(filters),invoiceController.getAllInvoice);
router.get('/getInvoiceById', authentication, validator.query(id), invoiceController.getInvoiceById);

module.exports = router;

