const express = require("express");
const validator = require("express-joi-validation").createValidator({});
const authentication = require("../middlewares/jwtToken");
const router = express.Router();
const subscriptionController = require("../controllers/subscriptionController");
const {
  addSubscription,
  id,
  updateSubscription,
  filters,
} = require("../validation/subscription");

router.post(
  "/addSubscription",
  validator.body(addSubscription),
  authentication,
  subscriptionController.addSubscription
);
router.get(
  "/getAllSubscription",
  validator.query(filters),
  authentication,
  subscriptionController.getAllSubscription
);
router.get(
  "/getSubscriptionById",
  authentication,
  validator.query(id),
  subscriptionController.getSubscriptionById
);
router.delete(
  "/deleteSubscription",
  authentication,
  validator.query(id),
  subscriptionController.deleteSubscription
);
router.put(
  "/updateSubscription",
  validator.body(updateSubscription),
  authentication,
  subscriptionController.updateSubscription
);
module.exports = router;
