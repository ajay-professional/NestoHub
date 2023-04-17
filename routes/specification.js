const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();
const authentication = require('../middlewares/jwtToken');
const specificationController = require('../controllers/specificationController');
const { addSpecification, updateSpecification, id, filters} = require('../validation/specification');

router.post( '/addSpecification', validator.body(addSpecification), specificationController.addSpecification);
router.put('/updateSpecification', authentication, validator.body(updateSpecification), specificationController.updateSpecification);
router.delete('/deleteSpecification', authentication, validator.query(id),specificationController.deleteSpecification);
router.get('/getAllSpecification', authentication,  validator.query(filters),specificationController.getAllSpecification);
router.get('/getSpecificationById', authentication, validator.query(id), specificationController.getSpecificationById);

module.exports = router;

