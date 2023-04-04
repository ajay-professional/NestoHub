const Joi = require('joi');

exports.addSubscriptionOrder = Joi.object().keys({
    transactionId:Joi.string().optional(),
    builderId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    planId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    selectProperties:Joi.array().optional().items(Joi.string().optional()).required(),
});

exports.id = Joi.object().keys({
    id:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.filters = Joi.object().keys({
    builderId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
    planId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
});

