const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();
const authentication = require('../middlewares/jwtToken');
const bannerController = require('../controllers/bannerController');
const { addBanner, updateBanner, id, filters } = require('../validation/banner');

router.post('/addBanner', authentication, validator.body(addBanner), bannerController.addBanner);
router.put('/updateBanner', authentication, validator.body(updateBanner), bannerController.updateBanner);
router.delete('/deleteBanner', authentication, validator.query(id), bannerController.deleteBanner);
router.get('/getAllBanner', authentication,validator.query(filters), bannerController.getAllBanner);
router.get('/getBannerById', authentication, validator.query(id), bannerController.getBannerById);


module.exports = router;