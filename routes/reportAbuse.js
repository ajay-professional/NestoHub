const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();
const authentication = require('../middlewares/jwtToken');
const reportAbuseController = require('../controllers/reportAbuseController');
const { addReportAbuse, updateReportAbuse, id,filters } = require('../validation/reportAbuse');

router.post('/addReportAbuse', authentication, validator.body(addReportAbuse),reportAbuseController.addReportAbuse);
router.put('/updateReportAbuse', authentication, validator.body(updateReportAbuse),reportAbuseController.updateReportAbuse);
router.delete('/deleteReportAbuse', authentication, validator.query(id),reportAbuseController.deleteReportAbuse);
router.get('/getAllReportAbuse', authentication,validator.query(filters),reportAbuseController.getAllReportAbuse);
router.get('/getReportAbuseById', authentication, validator.query(id),reportAbuseController.getReportAbuseById);


module.exports = router;