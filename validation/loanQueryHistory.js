const Joi = require('joi');

exports.addLoanQueryHistory = Joi.object().keys({
    loanQueryId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an loan oid').required(),
    brokerId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an  broker oid').required(),
    dsaId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an dsa oid').required(),
    boughtPropertyId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an bought oid').required(),
    propertyType: Joi.string().required(),
    status: Joi.string().required(),
    demandingCost:Joi.string().required(),
    denyReason:  Joi.string().required(),
});

exports.updateLoanQueryHistory = Joi.object().keys({
    id:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    loanQueryId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    brokerId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    dsaId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    boughtPropertyId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    propertyType: Joi.string().required(),
    status: Joi.string().required(),
    demandingCost:Joi.string().required(),
    denyReason:  Joi.string().required(),
});


exports.id = Joi.object().keys({
    id:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.filters = Joi.object().keys({
    loanQueryId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
    propertyId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
    brokerId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
    dsaId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
    boughtPropertyId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
});