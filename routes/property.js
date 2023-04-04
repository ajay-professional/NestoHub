const express = require("express");
const validator = require("express-joi-validation").createValidator({});

const router = express.Router();
const authentication = require("../middlewares/jwtToken");
const propertyController = require("../controllers/propertyController");
const { addPropertyDetails,updatePropertyDetails,addFloorPlanAndPricing,updateFloorPlanAndPricing,deleteFloorPlanAndPricing,
    id,filters,updateBrokerageDetails,getAllFloorPlanAndPricing,getFloorPlanAndPricingById, getPropertiesAnalyticsForIndividualProperty,
    addAmenities,updateAmenities,deleteAmenities,getAllAmenities,getAmenitiesById,addLocationAdvantages,updateLocationAdvantages
    ,deleteLocationAdvantages,getAllLocationAdvantages,getLocationAdvantagesById,addPropertyAdvertiseMentDetails,updatePropertyAdvertiseMentDetails,
    deletePropertyAdvertiseMentDetails,getAllPropertyAdvertiseMentDetails,getPropertyAdvertiseMentDetailsById ,
    addCurrentlyComparing,updateCurrentlyComparing,deleteCurrentlyComparing,getAllCurrentlyComparing,getCurrentlyComparingById,addOnBoarding} = require("../validation/property");

router.post("/addPropertyDetails",authentication,validator.body(addPropertyDetails),propertyController.addPropertyDetails);
router.put("/updatePropertyDetails",authentication,validator.body(updatePropertyDetails),propertyController.updatePropertyDetails);
router.put("/addFloorPlanAndPricing",authentication,validator.body(addFloorPlanAndPricing),propertyController.addFloorPlanAndPricing);
router.put("/updateFloorPlanAndPricing",authentication,validator.body(updateFloorPlanAndPricing),propertyController.updateFloorPlanAndPricing);
router.delete("/deleteFloorPlanAndPricing",authentication,validator.query(deleteFloorPlanAndPricing),propertyController.deleteFloorPlanAndPricing);
router.get("/getAllFloorPlanAndPricing",authentication,validator.body(getAllFloorPlanAndPricing),propertyController.getAllFloorPlanAndPricing);
router.get("/getFloorPlanAndPricingById",authentication,validator.query(getFloorPlanAndPricingById),propertyController.getFloorPlanAndPricingById);
router.put("/addAmenities",authentication,validator.body(addAmenities),propertyController.addAmenities);
router.put("/updateAmenities",authentication,validator.body(updateAmenities),propertyController.updateAmenities);
router.delete("/deleteAmenities",authentication,validator.query(deleteAmenities),propertyController.deleteAmenities);
router.get("/getAllAmenities",authentication,validator.query(getAllAmenities),propertyController.getAllAmenities);
router.get("/getAmenitiesById",authentication,validator.query(getAmenitiesById),propertyController.getAmenitiesById);

router.put("/addLocationAdvantages",authentication,validator.body(addLocationAdvantages),propertyController.addLocationAdvantages);
router.put("/updateLocationAdvantages",authentication,validator.body(updateLocationAdvantages),propertyController.updateLocationAdvantages);
router.delete("/deleteLocationAdvantages",authentication,validator.query(deleteLocationAdvantages),propertyController.deleteLocationAdvantages);
router.get("/getAllLocationAdvantages",authentication,validator.query(getAllLocationAdvantages),propertyController.getAllLocationAdvantages);
router.get("/getLocationAdvantagesById",authentication,validator.query(getLocationAdvantagesById),propertyController.getLocationAdvantagesById);

router.put("/addpropertyAdvertiseMentDetails",authentication,validator.body(addPropertyAdvertiseMentDetails),propertyController.addPropertyAdvertiseMentDetails);
router.put("/updatepropertyAdvertiseMentDetails",authentication,validator.body(updatePropertyAdvertiseMentDetails),propertyController.updatePropertyAdvertiseMentDetails);
router.delete("/deletepropertyAdvertiseMentDetails",authentication,validator.query(deletePropertyAdvertiseMentDetails),propertyController.deletePropertyAdvertiseMentDetails);
router.get("/getAllpropertyAdvertiseMentDetails",authentication,validator.query(getAllPropertyAdvertiseMentDetails),propertyController.getAllPropertyAdvertiseMentDetails);
router.get("/getpropertyAdvertiseMentDetailsById",authentication,validator.query(getPropertyAdvertiseMentDetailsById),propertyController.getPropertyAdvertiseMentDetailsById);

router.put("/updateCurrentlyComparing",authentication,validator.body(updateCurrentlyComparing),propertyController.updateCurrentlyComparing);

router.put("/updateBrokerageDetails",authentication,validator.body(updateBrokerageDetails),propertyController.updateBrokerageDetails);
// router.delete("/deleteProperty",authentication,validator.query(id),propertyController.deleteProperty);
router.get("/getAllProperty", authentication, validator.query(filters), propertyController.getAllProperty);
router.get("/getPropertyById",authentication,validator.query(id),propertyController.getPropertyById);
router.get("/getPropertiesAnalyticsForIndividualProperty",authentication,validator.query(getPropertiesAnalyticsForIndividualProperty),propertyController.getPropertiesAnalyticsForIndividualProperty);

router.post("/addOnBoarding",authentication,validator.body(addOnBoarding),propertyController.addOnBoarding);
module.exports = router;

