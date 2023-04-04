const Joi = require('joi');

exports.addRoles = Joi.object().keys({
    add: Joi.string().required().valid('property','finance'),
    name: Joi.string().required(),  
    email: Joi.string().email().required(),
    mobileNumber: Joi.string().min(10).max(10).required(),
    builderId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    selectProperties:Joi.array().optional().items(Joi.string().optional()).required(),
});

exports.updateRoles = Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    add: Joi.string().required().valid('property','finance'),
    name: Joi.string().required(),  
    email: Joi.string().email().required(),
    mobileNumber: Joi.string().min(10).max(10).required(),
    builderId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    selectProperties:Joi.array().optional().items(Joi.string().optional()).required(),
});


exports.id = Joi.object().keys({
    id:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.filters = Joi.object().keys({
    pageSize:Joi.string().optional().default(500),
    pageNo:Joi.string().optional().default(1),
    builderId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    add: Joi.string().required().valid('property','finance'),
});
