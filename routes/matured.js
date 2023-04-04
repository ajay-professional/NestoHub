const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();
const authentication = require('../middlewares/jwtToken');
const maturedController = require('../controllers/maturedController');
const { addMatured, updateMatured, id,filters } = require('../validation/matured');

router.post('/addMatured', authentication, validator.body(addMatured), maturedController.addMatured);
router.put('/updateMatured', authentication, validator.body(updateMatured), maturedController.updateMatured);
router.delete('/deleteMatured', authentication, validator.query(id), maturedController.deleteMatured);
router.get('/getAllMatured', authentication,validator.query(filters), maturedController.getAllMatured);
router.get('/getMaturedById', authentication, validator.query(id), maturedController.getMaturedById);


module.exports = router;