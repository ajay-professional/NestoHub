const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();
const authentication = require('../middlewares/jwtToken');
const referalEarningsController = require('../controllers/referalEarningsController');
const {id, filters } = require('../validation/referalEarnings');

router.put('/updateReferalEarnings', authentication, validator.body(updateReferalEarnings), referalEarningsController.updateReferalEarnings);
router.delete('/deleteReferalEarnings', authentication, validator.query(id), referalEarningsController.deleteReferalEarnings);
router.get('/getAllReferalEarnings', authentication, validator.query(filters), referalEarningsController.getAllReferalEarnings);
router.get('/getReferalEarningsById', authentication, validator.query(id), referalEarningsController.getReferalEarningsById);


module.exports = router;