const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();
const authentication = require('../middlewares/jwtToken');
const promotionBannerController = require('../controllers/promotionBannerController');
const { addPromotionBanner, updatePromotionBanner, id, filters } = require('../validation/promotionBanner');

router.post('/addPromotionBanner', authentication, validator.body(addPromotionBanner), promotionBannerController.addPromotionBanner);
router.put('/updatePromotionBanner', authentication, validator.body(updatePromotionBanner), promotionBannerController.updatePromotionBanner);
router.delete('/deletePromotionBanner', authentication, validator.query(id), promotionBannerController.deletePromotionBanner);
router.get('/getAllPromotionBanner', authentication,validator.query(filters), promotionBannerController.getAllPromotionBanner);
router.get('/getPromotionBannerById', authentication, validator.query(id), promotionBannerController.getPromotionBannerById);


module.exports = router;