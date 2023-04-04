const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();
const authentication = require('../middlewares/jwtToken');
const raiseQueryController = require('../controllers/raiseQueryController.js');
const { addRaiseQuery, updateRaiseQuery, id,filters} = require('../validation/raiseQuery');

router.post( '/addRaiseQuery', authentication, validator.body(addRaiseQuery), raiseQueryController.addRaiseQuery);
router.put('/updateRaiseQuery', authentication, validator.body(updateRaiseQuery), raiseQueryController.updateRaiseQuery);
router.delete('/deleteRaiseQuery',authentication, validator.query(id),raiseQueryController.deleteRaiseQuery);
router.get('/getAllRaiseQuery', authentication,  validator.query(filters),raiseQueryController.getAllRaiseQuery);
router.get('/getRaiseQueryById', authentication, validator.query(id), raiseQueryController.getRaiseQueryById);

module.exports = router;