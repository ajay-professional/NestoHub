const Joi = require('joi');

exports.addMatured = Joi.object().keys({
    dsaName: Joi.string().required(),
    bankName: Joi.string().required(),
    disbursedAmount:Joi.string().required(),
    disbursedDate:Joi.string().required(),
    customerId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    propertyId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    brokerId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.updateMatured = Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    dsaName: Joi.string().required(),
    bankName: Joi.string().required(),
    disbursedAmount:Joi.string().required(),
    disbursedDate:Joi.string().required(),
    customerId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    propertyId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    brokerId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});


exports.id = Joi.object().keys({
    id:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.filters = Joi.object().keys({
    customerId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
    propertyId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
    brokerId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
    pageSize:Joi.string().optional().default(500),
    pageNo:Joi.string().optional().default(1),
});