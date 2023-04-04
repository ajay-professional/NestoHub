const Joi = require('joi');

exports.addPayment = Joi.object().keys({
    bankName: Joi.string().required(), 
    accountNumber: Joi.string().required(), 
    bankName:  Joi.string().required(), 
    ifscCode:  Joi.string().required(), 
    recipientName: Joi.string().required(), 
    transactionDate: Joi.string().required(), 
    transactionId:Joi.string().required(),
    transactionAmount: Joi.string().required(), 
    brokerId:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    invoiceId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    builderId:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.updatePayment = Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    bankName: Joi.string().required(), 
    accountNumber: Joi.string().required(), 
    bankName:  Joi.string().required(), 
    ifscCode:  Joi.string().required(), 
    recipientName: Joi.string().required(), 
    transactionDate: Joi.string().required(), 
    transactionId:Joi.string().required(),
    transactionAmount: Joi.string().required(), 
    brokerId:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    invoiceId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    builderId:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.id = Joi.object().keys({
    id:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.filters = Joi.object().keys({
    brokerId:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
    builderId:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
    pageSize:Joi.string().optional().default(500),
    pageNo:Joi.string().optional().default(1),
});