const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();
const authentication = require('../middlewares/jwtToken');
const propertySubCategoryController = require('../controllers/propertySubCategoryController');
const { addPropertySubCategory, updatePropertySubCategory, id,filters } = require('../validation/propertySubCategory');

router.post('/addPropertySubCategory', authentication, validator.body(addPropertySubCategory), propertySubCategoryController.addPropertySubCategory);
router.put('/updatePropertySubCategory', authentication, validator.body(updatePropertySubCategory), propertySubCategoryController.updatePropertySubCategory);
router.delete('/deletePropertySubCategory', authentication, validator.query(id), propertySubCategoryController.deletePropertySubCategory);
router.get('/getAllpropertySubCategory', authentication,validator.query(filters), propertySubCategoryController.getAllPropertySubCategory);
router.get('/getpropertySubCategoryById', authentication, validator.query(id), propertySubCategoryController.getPropertySubCategoryById);


module.exports = router;