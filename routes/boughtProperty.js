const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();
const authentication = require('../middlewares/jwtToken');
const boughtPropertyController = require('../controllers/boughtPropertyController');
const { addBoughtProperty, updateBoughtProperty, id ,filters} = require('../validation/boughtProperty');

router.post('/addBoughtProperty', authentication, validator.body(addBoughtProperty), boughtPropertyController.addBoughtProperty);
router.put('/updateBoughtProperty', authentication, validator.body(updateBoughtProperty), boughtPropertyController.updateBoughtProperty);
router.delete('/deleteBoughtProperty', authentication, validator.query(id), boughtPropertyController.deleteBoughtProperty);
router.get('/getAllBoughtProperty', authentication,validator.query(filters), boughtPropertyController.getAllBoughtProperty);
router.get('/getBoughtPropertyById', authentication, validator.query(id), boughtPropertyController.getBoughtPropertyById);
module.exports = router; 
