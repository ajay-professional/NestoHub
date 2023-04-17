
const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();
const authentication = require('../middlewares/jwtToken');
const furnishingDetailController = require('../controllers/furnishingDetailController');
const { addFurnishingDetail, updateFurnishingDetail, id, filters} = require('../validation/furnishingDetail');

router.post("/addFurnishingDetail",authentication,validator.body(addFurnishingDetail),furnishingDetailController.addFurnishingDetail);
router.put("/updateFurnishingDetail",authentication,validator.body(updateFurnishingDetail),furnishingDetailController.updateFurnishingDetail);
router.delete("/deleteFurnishingDetail",authentication,validator.query(id),furnishingDetailController.deleteFurnishingDetail);
router.get("/getAllFurnishingDetail",authentication,validator.query(filters),furnishingDetailController.getAllFurnishingDetail);
router.get("/getFurnishingDetailById",authentication,validator.query(id),furnishingDetailController.getFurnishingDetailById);

module.exports = router;












