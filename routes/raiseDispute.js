const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();
const authentication = require('../middlewares/jwtToken');
const raiseDisputeController = require('../controllers/raiseDisputeController.js');
const { addRaiseDispute, updateRaiseDispute, id,filters} = require('../validation/raiseDispute');

router.post( '/addRaiseDispute', authentication, validator.body(addRaiseDispute), raiseDisputeController.addRaiseDispute);
router.put('/updateRaiseDispute', authentication, validator.body(updateRaiseDispute), raiseDisputeController.updateRaiseDispute);
router.delete('/deleteRaiseDispute',authentication,validator.query(id),raiseDisputeController.deleteRaiseDispute);
router.get('/getAllRaiseDispute', authentication,  validator.query(filters),raiseDisputeController.getAllRaiseDispute);
router.get('/getRaiseDisputeById', authentication, validator.query(id), raiseDisputeController.getRaiseDisputeById);

module.exports = router;