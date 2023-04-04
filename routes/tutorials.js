const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();
const authentication = require('../middlewares/jwtToken');
const tutorialsController = require('../controllers/tutorialsController');
const { addTutorials, updateTutorials, id, filters } = require('../validation/tutorials');

router.post('/addTutorials', authentication, validator.body(addTutorials), tutorialsController.addTutorials);
router.put('/updateTutorials', authentication, validator.body(updateTutorials), tutorialsController.updateTutorials);
router.delete('/deleteTutorials', authentication, validator.query(id), tutorialsController.deleteTutorials);
router.get('/getAllTutorials', authentication,validator.query(filters), tutorialsController.getAllTutorials);
router.get('/getTutorialsById', authentication, validator.query(id), tutorialsController.getTutorialsById);

module.exports = router;