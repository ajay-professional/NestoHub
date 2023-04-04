const Joi = require('joi');

exports.addPropertyCategory = Joi.object().keys({
    name:  Joi.string().required(), 
    description: Joi.string().optional(), 
});

exports.updatePropertyCategory = Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    name:  Joi.string().required(), 
    description: Joi.string().optional(),
});


exports.id = Joi.object().keys({
    id:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.filters = Joi.object().keys({
    pageSize:Joi.string().optional().default(500),
    pageNo:Joi.string().optional().default(1),
});