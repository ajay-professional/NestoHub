const Joi = require('joi');

exports.addCustomer = Joi.object().keys({
    clientName: Joi.string().required(), 
    email:  Joi.string().email().required(),
    phoneNumber:  Joi.string().min(10).max(10).required(),
    alternatePhoneNumber:  Joi.string().min(10).max(10).required(),
    unitType: Joi.array().optional().items(Joi.string().optional()).required(),
    preferredLocation: Joi.array().optional().items(Joi.string().optional()).required(),
    minPrice:Joi.string().required(),
    maxPrice:Joi.string().required(),
    brokerId:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.updateCustomer = Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    clientName: Joi.string().required(), 
    email:  Joi.string().email().required(),
    phoneNumber:  Joi.string().min(10).max(10).required(),
    alternatePhoneNumber:  Joi.string().min(10).max(10).required(),
    unitType: Joi.array().optional().items(Joi.string().optional()).required(),
    preferredLocation: Joi.array().optional().items(Joi.string().optional()).required(),
    minPrice:Joi.string().required(),
    maxPrice:Joi.string().required(),
    brokerId:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});


exports.id = Joi.object().keys({
    id:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.filters = Joi.object().keys({
    search: Joi.string().optional().trim().allow(""),
    pageSize:Joi.string().optional().default(500),
    pageNo:Joi.string().optional().default(1),
    brokerId:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
});