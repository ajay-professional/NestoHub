const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();
const authentication = require('../middlewares/jwtToken');
const faqAndSupportController = require('../controllers/faqAndSupportController');
const { addFaqAndSupport, updateFaqAndSupport, id,filters } = require('../validation/faqAndSupport');

router.post('/addFaqAndSupport', authentication, validator.body(addFaqAndSupport), faqAndSupportController.addFaqAndSupport);
router.put('/updateFaqAndSupport', authentication, validator.body(updateFaqAndSupport), faqAndSupportController.updateFaqAndSupport);
router.delete('/deleteFaqAndSupport', authentication, validator.query(id), faqAndSupportController.deleteFaqAndSupport);
router.get('/getAllFaqAndSupport', authentication,validator.query(filters), faqAndSupportController.getAllFaqAndSupport);
router.get('/getFaqAndSupportById', authentication, validator.query(id), faqAndSupportController.getFaqAndSupportById);


module.exports = router;