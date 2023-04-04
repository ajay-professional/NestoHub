const express = require('express');
const validator = require('express-joi-validation').createValidator({});
const authentication = require('../middlewares/jwtToken');
const router = express.Router();
const subscriptionOrderController = require('../controllers/subscriptionOrderController.js');
const { addSubscriptionOrder,id,filters} = require('../validation/subscriptionOrder');

router.post('/addSubscriptionOrder', validator.body(addSubscriptionOrder), authentication, subscriptionOrderController.addSubscriptionOrder);
router.delete('/deleteSubscriptionOrder', validator.query(id),authentication, subscriptionOrderController.deleteSubscriptionOrder);
router.get('/getAllSubscriptionOrder', validator.query(filters),authentication, subscriptionOrderController.getAllSubscriptionOrder);
router.get('/getSubscriptionOrderById', authentication, validator.query(id),subscriptionOrderController.getSubscriptionOrderById);


module.exports = router;
