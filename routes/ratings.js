const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();
const authentication = require('../middlewares/jwtToken');
const ratingsController = require('../controllers/ratingsController');
const { addRatings, updateRatings, id,filters } = require('../validation/ratings');

router.post('/addRatings', authentication, validator.body(addRatings), ratingsController.addRatings);
router.put('/updateRatings', authentication, validator.body(updateRatings), ratingsController.updateRatings);
router.delete('/deleteRatings', authentication, validator.query(id), ratingsController.deleteRatings);
router.get('/getAllRatingsOfProperty', authentication,validator.query(filters), ratingsController.getAllRatingsOfProperty);
router.get('/getAllRatingsByCustomer', authentication,validator.query(filters), ratingsController.getAllRatingsByCustomer);
router.get('/getRatingsById', authentication, validator.query(id), ratingsController.getRatingsById);


module.exports = router;