const Joi = require('joi');

exports.addRequirement = Joi.object().keys({
    unitType: Joi.array().items(Joi.string().optional()).optional(),
    preferredLocation:Joi.array().items(Joi.string().required()).optional(),
    minPrice: Joi.string().required(),
    maxPrice: Joi.string().required(),
    customerId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    brokerId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.updateRequirement = Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    unitType: Joi.array().items(Joi.string().optional()).optional(),
    preferredLocation:Joi.array().items(Joi.string().required()).optional(),
    minPrice: Joi.string().required(),
    maxPrice: Joi.string().required(),
    customerId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    brokerId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.id = Joi.object().keys({
    id:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.filters = Joi.object().keys({
    search:Joi.string().optional().trim().allow(""),
    pageSize:Joi.string().optional().default(500),
    pageNo:Joi.string().optional().default(1),
    customerId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    brokerId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});