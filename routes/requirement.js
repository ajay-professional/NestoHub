const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();
const authentication = require('../middlewares/jwtToken');
const requirementController = require('../controllers/requirementController.js');
const { addRequirement, updateRequirement, id,filters } = require('../validation/requirement');

router.post('/addRequirement', authentication, validator.body(addRequirement), requirementController.addRequirement);
router.put('/updateRequirement', authentication, validator.body(updateRequirement), requirementController.updateRequirement);
router.delete('/deleteRequirement', authentication, validator.query(id), requirementController.deleteRequirement);
router.get('/getAllRequirement', authentication,validator.query(filters), requirementController.getAllRequirement);
router.get('/getRequirementById', authentication, validator.query(id), requirementController.getRequirementById);


module.exports = router;