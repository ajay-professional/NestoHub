const Joi = require('joi');

exports.addBanner = Joi.object().keys({
    title:  Joi.string().required(), 
    description:  Joi.string().required(), 
    propertyId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.updateBanner= Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    title:  Joi.string().required(), 
    description:  Joi.string().required(), 
    propertyId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.id = Joi.object().keys({
    id:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.filters = Joi.object().keys({
    pageSize:Joi.string().optional().default(500),
    pageNo:Joi.string().optional().default(1),
});