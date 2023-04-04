const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();
const authentication = require('../middlewares/jwtToken');
const customerController = require('../controllers/customerController');
const { addCustomer, updateCustomer, id, filters } = require('../validation/customer');

router.post('/addCustomer', authentication, validator.body(addCustomer), customerController.addCustomer);
router.put('/updateCustomer', authentication, validator.body(updateCustomer), customerController.updateCustomer);
router.delete('/deleteCustomer', authentication, validator.query(id), customerController.deleteCustomer);
router.get('/getAllCustomer', authentication,validator.query(filters), customerController.getAllCustomer);
router.get('/getCustomerById', authentication, validator.query(id), customerController.getCustomerById);


module.exports = router;