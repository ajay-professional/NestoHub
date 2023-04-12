
const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();
const authentication = require('../middlewares/jwtToken');
const amenitiesController = require('../controllers/amenitiesController');
const { addAmenities, updateAmenities, id, filters} = require('../validation/amenities');

router.post("/addAmenities",authentication,validator.body(addAmenities),amenitiesController.addAmenities);
router.put("/updateAmenities",authentication,validator.body(updateAmenities),amenitiesController.updateAmenities);
router.delete("/deleteAmenities",authentication,validator.query(id),amenitiesController.deleteAmenities);
router.get("/getAllAmenities",authentication,validator.query(filters),amenitiesController.getAllAmenities);
router.get("/getAmenitiesById",authentication,validator.query(id),amenitiesController.getAmenitiesById);

module.exports = router;












