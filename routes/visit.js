const express = require("express");
const validator = require("express-joi-validation").createValidator({});

const router = express.Router();
const authentication = require("../middlewares/jwtToken");
const visitController = require("../controllers/visitController");
const {addVisit,visitSummary,id,filters,verifyOtp,sendOtp,getPendingVisitAnalytics, getAllVisitAlert, visitComment} = require("../validation/visit.js");
router.post("/addVisit",authentication,validator.body(addVisit),visitController.addVisit);
router.put("/visitSummary",authentication,validator.body(visitSummary),visitController.visitSummary);
router.put("/addVisitComment",authentication, validator.body(visitComment),visitController.visitComment);
router.post("/verifyOtp", validator.body(verifyOtp), visitController.verifyOtp);
router.post("/resendOtp", validator.body(sendOtp), visitController.resendOtp);
router.delete("/deleteVisit",authentication,validator.query(id),visitController.deleteVisit);
router.get("/getAllVisit",authentication,validator.query(filters),visitController.getAllVisit);
router.get("/getAllVisitAlert",authentication, validator.query(getAllVisitAlert), visitController.getAllVisitAlert);
router.get("/getVisitById",authentication,validator.query(id),visitController.getVisitById);
router.get("/getVisitAnalytics",authentication,validator.query(getPendingVisitAnalytics),visitController.getPendingVisitAnalytics);
module.exports = router;
