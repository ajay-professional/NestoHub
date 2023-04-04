const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();
const authentication = require('../middlewares/jwtToken');
const propertyCategoryController = require('../controllers/propertyCategoryController');
const { addPropertyCategory, updatePropertyCategory, id,filters } = require('../validation/propertyCategory');

router.post('/addPropertyCategory', authentication, validator.body(addPropertyCategory), propertyCategoryController.addPropertyCategory);
router.put('/updatePropertyCategory', authentication, validator.body(updatePropertyCategory), propertyCategoryController.updatePropertyCategory);
router.delete('/deletePropertyCategory', authentication, validator.query(id), propertyCategoryController.deletePropertyCategory);
router.get('/getAllPropertyCategory', authentication,validator.query(filters), propertyCategoryController.getAllPropertyCategory);
router.get('/getPropertyCategoryById', authentication, validator.query(id), propertyCategoryController.getPropertyCategoryById);


module.exports = router;