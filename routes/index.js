const express = require("express");
const brokerRoots = require("./broker");
const bannerRoots = require("./banner");
const termsAndConditionsBrokerRoots = require("./termsAndConditionsBroker");
const promotionBannerRoots = require("./promotionBanner");
const dsaRoots = require("./dsa.js");
const builderRoots = require("./builder");
const customerRoots = require("./customer");
const requirementRoots = require("./requirement");
const propertyRoots = require("./property");
const rolesRoots = require("./roles");
const shareRoots = require("./share");
const ratingsRoots = require("./ratings");
const visitRoots = require("./visit");
const brokerEarningsRoots = require("./brokerEarnings");
const claimRoots = require("./claim");
const RequestPropertyRoots = require("./requestProperty");
const RequestNewPropertyRoots = require("./requestNewProperty");
const PropertyCategoryRoots = require("./propertyCategory");
const PropertySubCategoryRoots = require("./propertySubCategory");
const paymentRoots = require("./payment");
const subscriptionRoots = require("./subscription");
const subscriptionOrderRoots = require("./subscriptionOrder");
const notificationRoots = require("./notification.js");
const raiseDisputeRoots = require("./raiseDispute");
const maturedRoots = require("./matured");
const loanQueryDetailsRoots = require("./loanQueryDetails");
const invoiceRoots = require('./invoice')
const bankRoots = require('./bank');
const faqAndSupportRoots = require('./faqAndSupport.js');
const tutorialsRoots = require('./tutorials.js');
const communitySupportAnswersRoots = require("./communitySupportAnswers");
const communitySupportQuestionsRoots = require("./communitySupportQuestions");
const reportAbuseRoots = require("./reportAbuse");
const boughtPropertyRoots = require("./boughtProperty");
const raiseQueryRoots = require("./raiseQuery");
const adminRoots = require("./admin");
const loanQueryHistoryRoots = require("./loanQueryHistory");
const router = express.Router();

router.use("/banner", bannerRoots);
router.use("/promotionBanner", promotionBannerRoots);
router.use("/boughtProperty", boughtPropertyRoots);
router.use("/broker", brokerRoots);
router.use("/builder", builderRoots);
router.use("/customer", customerRoots);
router.use("/property", propertyRoots);
router.use("/roles", rolesRoots);
router.use("/visit", visitRoots);
router.use("/dsa", dsaRoots);
router.use("/claim", claimRoots);
router.use("/requestProperty", RequestPropertyRoots);
router.use("/requestNewProperty", RequestNewPropertyRoots);
router.use("/getAllProperty", propertyRoots);
router.use("/requirement", requirementRoots);
router.use("/payment", paymentRoots);
router.use("/notification", notificationRoots);
router.use("/raiseDispute", raiseDisputeRoots);
router.use("/termsAndConditionsBroker", termsAndConditionsBrokerRoots);
router.use("/matured", maturedRoots);
router.use("/loanQueryDetails", loanQueryDetailsRoots);
router.use("/loanQueryHistory", loanQueryHistoryRoots);
router.use("/requirement", requirementRoots);
router.use("/brokerEarnings", brokerEarningsRoots);
router.use("/communitySupportQuestions", communitySupportQuestionsRoots);
router.use("/communitySupportAnswers", communitySupportAnswersRoots);
router.use("/faqAndSupport", faqAndSupportRoots);
router.use("/reportAbuse", reportAbuseRoots);
router.use("/ratings", ratingsRoots);
router.use("/share", shareRoots);
router.use("/propertyCategory", PropertyCategoryRoots);
router.use("/invoice", invoiceRoots);
router.use("/bank", bankRoots);
router.use("/tutorials", tutorialsRoots);
router.use("/subscription", subscriptionRoots);
router.use("/subscriptionOrder", subscriptionOrderRoots);
router.use("/raiseQuery", raiseQueryRoots);
router.use("/admin", adminRoots);
router.use("/PropertySubCategory", PropertySubCategoryRoots);

module.exports = router;