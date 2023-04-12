const express = require("express");
const validator = require("express-joi-validation").createValidator({});

const router = express.Router();
const authentication = require("../middlewares/jwtToken");
const propertyController = require("../controllers/propertyController");
const { addPropertyDetails,updatePropertyDetails,addFloorPlanAndPricing,updateFloorPlanAndPricing,deleteFloorPlanAndPricing,
    id,filters,updateBrokerageDetails,getAllFloorPlanAndPricing,getFloorPlanAndPricingById, getPropertiesAnalyticsForIndividualProperty} = require("../validation/property");

router.post("/addPropertyDetails",authentication,validator.body(addPropertyDetails),propertyController.addPropertyDetails);
router.put("/updatePropertyDetails",authentication,validator.body(updatePropertyDetails),propertyController.updatePropertyDetails);
router.put("/addFloorPlanAndPricing",authentication,validator.body(addFloorPlanAndPricing),propertyController.addFloorPlanAndPricing);
router.put("/updateFloorPlanAndPricing",authentication,validator.body(updateFloorPlanAndPricing),propertyController.updateFloorPlanAndPricing);
router.delete("/deleteFloorPlanAndPricing",authentication,validator.query(deleteFloorPlanAndPricing),propertyController.deleteFloorPlanAndPricing);
router.post("/getAllFloorPlanAndPricing",authentication,validator.body(getAllFloorPlanAndPricing),propertyController.getAllFloorPlanAndPricing);
router.get("/getFloorPlanAndPricingById",authentication,validator.query(getFloorPlanAndPricingById),propertyController.getFloorPlanAndPricingById);

router.put("/updateBrokerageDetails",authentication,validator.body(updateBrokerageDetails),propertyController.updateBrokerageDetails);
// router.delete("/deleteProperty",authentication,validator.query(id),propertyController.deleteProperty);
router.get("/getAllProperty", authentication, validator.query(filters), propertyController.getAllProperty);
router.get("/getPropertyById",authentication,validator.query(id),propertyController.getPropertyById);
router.get("/getPropertiesAnalyticsForIndividualProperty",authentication,validator.query(getPropertiesAnalyticsForIndividualProperty),propertyController.getPropertiesAnalyticsForIndividualProperty);

router.post("/script",propertyController.script);

module.exports = router;

