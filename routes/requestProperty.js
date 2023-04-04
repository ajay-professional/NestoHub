const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();
const authentication = require('../middlewares/jwtToken');
const requestPropertyController = require('../controllers/requestPropertyController.js');
const { addRequestProperty, updateRequestProperty, id,filters} = require('../validation/requestProperty');

router.post( '/addRequestProperty', authentication, validator.body(addRequestProperty), requestPropertyController.addRequestProperty);
router.put('/updateRequestProperty', authentication, validator.body(updateRequestProperty), requestPropertyController.updateRequestProperty);
router.delete('/deleteRequestProperty',authentication,validator.query(id),requestPropertyController.deleteRequestProperty);
router.get('/getAllRequestProperty', authentication,  validator.query(filters),requestPropertyController.getAllRequestProperty);
router.get('/getRequestPropertyById', authentication, validator.query(id), requestPropertyController.getRequestPropertyById);

module.exports = router;