const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController');

router.get('/getAllCity',cityController.getAllCity);
router.get('/getAllCountry',cityController.getAllCountry);
router.get('/getAllCountryAndCity',cityController.getAllCountryAndCity);
module.exports = router;
