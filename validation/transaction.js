const Joi = require('joi');

exports.addTransaction = Joi.object().keys({
    invoiceId: Joi.string().required(), 
    paymentId:  Joi.string().email().required(),
    amount:  Joi.string().required(),
    paymentDate:Joi.string().required(),
});

exports.updateTransaction = Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    invoiceId: Joi.string().required(), 
    paymentId:  Joi.string().email().required(),
    amount:  Joi.string().required(),
    paymentDate:Joi.string().required(),
});


exports.id = Joi.object().keys({
    id:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.filters = Joi.object().keys({
    builderId:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
});