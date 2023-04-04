const Joi = require('joi');

exports.addRequestNewProperty = Joi.object().keys({
    name:  Joi.string().required(),
    email: Joi.string().required(),
    phoneNumber:  Joi.string().min(10).max(10).required(),
    typeOfProperty:Joi.array().optional().items(Joi.string().optional()).optional(),
    locationProperty:Joi.array().optional().items(Joi.string().optional()).optional(),
    projectName: Joi.string().optional(),
    description: Joi.string().optional(),
    builderId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.updateRequestNewProperty = Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    name:  Joi.string().required(),
    email: Joi.string().required(),
    phoneNumber:  Joi.string().min(10).max(10).required(),
    typeOfProperty:Joi.array().optional().items(Joi.string().optional()).optional(),
    locationProperty:Joi.array().optional().items(Joi.string().optional()).optional(),
    projectName:  Joi.string().required(),
    description:  Joi.string().required(),
    builderId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});
exports.id = Joi.object().keys({
    id:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.filters = Joi.object().keys({
    pageSize:Joi.string().optional().default(500),
    pageNo:Joi.string().optional().default(1),
    builderId:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
});