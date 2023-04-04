const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();
const authentication = require('../middlewares/jwtToken');
const rolesController = require('../controllers/rolesController');
const { addRoles, updateRoles, id,filters} = require('../validation/roles.js');

router.post( '/addRoles', authentication, validator.body(addRoles), rolesController.addRoles);
router.put('/updateRoles', authentication, validator.body(updateRoles),rolesController.updateRoles);
router.delete('/deleteRoles', authentication,validator.query(id),rolesController.deleteRoles);
router.get('/getAllRoles', authentication,validator.query(filters), rolesController.getAllRoles);
router.get('/getRolesById', authentication, validator.query(id), rolesController.getRolesById);
module.exports = router;