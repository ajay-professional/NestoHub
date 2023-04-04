const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();
const authentication = require('../middlewares/jwtToken');
const communitySupportQuestionsController = require('../controllers/communitySupportQuestionsController');
const { addCommunitySupportQuestions, updateCommunitySupportQuestions, id,filters } = require('../validation/communitySupportQuestions');

router.post('/addCommunitySupportQuestions', authentication, validator.body(addCommunitySupportQuestions), communitySupportQuestionsController.addCommunitySupportQuestions);
router.put('/updateCommunitySupportQuestions', authentication, validator.body(updateCommunitySupportQuestions), communitySupportQuestionsController.updateCommunitySupportQuestions);
router.delete('/deleteCommunitySupportQuestions', authentication, validator.query(id), communitySupportQuestionsController.deleteCommunitySupportQuestions);
router.get('/getAllCommunitySupportQuestions', authentication,validator.query(filters), communitySupportQuestionsController.getAllCommunitySupportQuestions);
router.get('/getCommunitySupportQuestionsById', authentication, validator.query(id), communitySupportQuestionsController.getCommunitySupportQuestionsById);


module.exports = router;