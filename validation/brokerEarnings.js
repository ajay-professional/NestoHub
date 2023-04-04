const Joi = require('joi');

exports.addBrokerEarnings = Joi.object().keys({
    claimId: Joi.string().required(),
    transactionId: Joi.string().required(),
    paymentDate: Joi.string().required(),
    amount: Joi.string().required(),
    brokerId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.updateBrokerEarnings = Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    claimId: Joi.string().required(),
    transactionId: Joi.string().required(),
    paymentDate: Joi.string().required(),
    amount: Joi.string().required(),
    brokerId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.id = Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.filters = Joi.object().keys({
    brokerId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    pageSize:Joi.string().optional().default(500),
    pageNo:Joi.string().optional().default(1),
});