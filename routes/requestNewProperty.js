const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();
const authentication = require('../middlewares/jwtToken');
const requestNewPropertyController = require('../controllers/requestNewPropertyController.js');
const { addRequestNewProperty, updateRequestNewProperty, id,filters} = require('../validation/requestNewProperty');

router.post( '/addRequestNewProperty', authentication, validator.body(addRequestNewProperty), requestNewPropertyController.addRequestNewProperty);
router.put('/updateRequestNewProperty', authentication, validator.body(updateRequestNewProperty), requestNewPropertyController.updateRequestNewProperty);
router.delete('/deleteRequestNewProperty',authentication,validator.query(id),requestNewPropertyController.deleteRequestNewProperty);
router.get('/getAllRequestNewProperty', authentication,  validator.query(filters),requestNewPropertyController.getAllRequestNewProperty);
router.get('/getRequestNewPropertyById', authentication, validator.query(id), requestNewPropertyController.getRequestNewPropertyById);

module.exports = router;