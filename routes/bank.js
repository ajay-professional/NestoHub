const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();
const authentication = require('../middlewares/jwtToken');
const bankController = require('../controllers/bankController');
const { addBank, updateBank, id, filters} = require('../validation/bank');

router.post( '/addBank', validator.body(addBank), bankController.addBank);
router.put('/updateBank', authentication, validator.body(updateBank), bankController.updateBank);
router.delete('/deleteBank', authentication, validator.query(id),bankController.deleteBank);
router.get('/getAllBank', authentication,  validator.query(filters),bankController.getAllBank);
router.get('/getBankById', authentication, validator.query(id), bankController.getBankById);

module.exports = router;

