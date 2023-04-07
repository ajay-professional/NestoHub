const Joi = require('joi');

exports.addRequirement = Joi.object().keys({
    unitType: Joi.string().optional(),
    propertyType: Joi.string().optional(),
    preferredLocation:Joi.string().required(),
    minPrice: Joi.string().required(),
    maxPrice: Joi.string().required(),
    customerId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    brokerId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.updateRequirement = Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    propertyType: Joi.string().optional(),
    unitType:Joi.string().optional(),
    preferredLocation:Joi.string().required(),
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