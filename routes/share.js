const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();
const authentication = require('../middlewares/jwtToken');
const shareController = require('../controllers/shareController');
const { addShare, id, filters} = require('../validation/share.js');

router.post( '/addShare', authentication, validator.body(addShare), shareController.addShare);
router.delete('/deleteShare', authentication,validator.query(id),shareController.deleteShare);
router.get('/getAllShare', authentication, validator.query(filters),shareController.getAllShare);
router.get('/getShareById', authentication, validator.query(id), shareController.getShareById);
module.exports = router;