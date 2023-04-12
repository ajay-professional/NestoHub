const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();
const authentication = require('../middlewares/jwtToken');
const locationAdvantageController = require('../controllers/locationAdvantageController');
const { addLocationAdvantage, updateLocationAdvantage, id, filters} = require('../validation/locationAdvantage');

router.post( '/addLocationAdvantage',authentication, validator.body(addLocationAdvantage), locationAdvantageController.addLocationAdvantage);
router.put('/updateLocationAdvantage', authentication, validator.body(updateLocationAdvantage), locationAdvantageController.updateLocationAdvantage);
router.delete('/deleteLocationAdvantage', authentication, validator.query(id),locationAdvantageController.deleteLocationAdvantage);
router.get('/getAllLocationAdvantage', authentication,  validator.query(filters),locationAdvantageController.getAllLocationAdvantage);
router.get('/getLocationAdvantageById', authentication, validator.query(id), locationAdvantageController.getLocationAdvantageById);

module.exports = router;

