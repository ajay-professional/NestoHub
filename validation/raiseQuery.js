const Joi = require('joi');

exports.addRaiseQuery = Joi.object().keys({
    subject:  Joi.string().required(),
    description: Joi.string().required(),
    createdById:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    type:Joi.string().required().valid('dsa','broker','builder')
});

exports.updateRaiseQuery = Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    subject:  Joi.string().required(),
    description: Joi.string().required(),
    createdById:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    type:Joi.string().required().valid('dsa','broker','builder')
});

exports.id = Joi.object().keys({
    id:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.filters = Joi.object().keys({
    pageSize:Joi.string().optional().default(500),
    pageNo:Joi.string().optional().default(1),
    createdById:Joi.string().optional(),
    type:Joi.string().optional().valid('dsa','broker','builder')
});