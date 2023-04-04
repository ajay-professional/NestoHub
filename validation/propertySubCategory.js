const Joi = require('joi');

exports.addPropertySubCategory = Joi.object().keys({
    name:  Joi.string().required(), 
    description: Joi.string().optional(), 
    parentId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.updatePropertySubCategory = Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    name:  Joi.string().required(), 
    description: Joi.string().optional(),
    parentId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});


exports.id = Joi.object().keys({
    id:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.filters = Joi.object().keys({
    parentId:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    pageSize:Joi.string().optional().default(500),
    pageNo:Joi.string().optional().default(1),
});