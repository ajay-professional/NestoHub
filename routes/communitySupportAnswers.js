const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();
const authentication = require('../middlewares/jwtToken');
const communitySupportAnswersController = require('../controllers/communitySupportAnswersController');
const { addCommunitySupportAnswers, updateCommunitySupportAnswers, id,filters } = require('../validation/communitySupportAnswers');

router.post('/addCommunitySupportAnswers', authentication, validator.body(addCommunitySupportAnswers),communitySupportAnswersController.addCommunitySupportAnswers);
router.put('/updateCommunitySupportAnswers', authentication, validator.body(updateCommunitySupportAnswers),communitySupportAnswersController.updateCommunitySupportAnswers);
router.delete('/deleteCommunitySupportAnswers', authentication, validator.query(id),communitySupportAnswersController.deleteCommunitySupportAnswers);
router.get('/getAllCommunitySupportAnswers', authentication,validator.query(filters),communitySupportAnswersController.getAllCommunitySupportAnswers);
router.get('/getCommunitySupportAnswersById', authentication, validator.query(id),communitySupportAnswersController.getCommunitySupportAnswersById);

module.exports = router;