const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();
const authentication = require('../middlewares/jwtToken');
const nearByAreaController = require('../controllers/nearByAreaController');
const { addNearByArea, updateNearByArea, id, filters} = require('../validation/nearByArea');

router.post( '/addNearByArea',authentication, validator.body(addNearByArea), nearByAreaController.addNearByArea);
router.put('/updateNearByArea', authentication, validator.body(updateNearByArea), nearByAreaController.updateNearByArea);
router.delete('/deleteNearByArea', authentication, validator.query(id),nearByAreaController.deleteNearByArea);
router.get('/getAllNearByArea', authentication,  validator.query(filters),nearByAreaController.getAllNearByArea);
router.get('/getNearByAreaById', authentication, validator.query(id), nearByAreaController.getNearByAreaById);

module.exports = router;

