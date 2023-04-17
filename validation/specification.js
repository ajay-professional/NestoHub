const Joi = require('joi');

exports.addSpecification = Joi.object().keys({
    name:Joi.string().required(),
    length:Joi.string().required(),
    breadth:Joi.string().required()
});

exports.updateSpecification = Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    name:Joi.string().required(),
    length:Joi.string().required(),
    breadth:Joi.string().required()
});

exports.id = Joi.object().keys({
    id:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});


exports.filters = Joi.object().keys({
    pageSize:Joi.string().optional().default(500),
    pageNo:Joi.string().optional().default(1),
});