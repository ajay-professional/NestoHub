const Joi = require('joi');

exports.addRatings = Joi.object().keys({
    rating:  Joi.string().required(), 
    message:  Joi.string().required(), 
    customerId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    propertyId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    brokerId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    builderId:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.updateRatings = Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    rating:  Joi.string().required(), 
    message:  Joi.string().required(), 
    customerId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    propertyId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    brokerId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    builderId:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});


exports.id = Joi.object().keys({
    id:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.filters = Joi.object().keys({
    pageSize:Joi.string().optional().default(500),
    pageNo:Joi.string().optional().default(1),
    customerId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    propertyId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    brokerId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    builderId:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});