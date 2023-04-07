const Joi = require('joi');

exports.addInvoice = Joi.object().keys({
    paidTo:Joi.string().required().valid("broker","admin"), 
    status: Joi.string().required().valid("pending","settled"), 
    invoiceAmount: Joi.string().required(), 
    brokerId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an brokerId oid').required(),
    builderId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an builderId oid').required(),
    claimId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an propertyId oid').required()
});

exports.updateInvoice = Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    paidTo:Joi.string().required().valid("broker","admin"), 
    status: Joi.string().required().valid("pending","settled"),  
    invoiceAmount: Joi.string().required(), 
    brokerId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an brokerId oid').required(),
    builderId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an builderId oid').required(),
    claimId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an propertyId oid').required()
});

exports.updateStatusForInvoice = Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    status: Joi.string().required().valid("settled"),
});


exports.id = Joi.object().keys({
    id:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.filters = Joi.object().keys({
    builderId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an builderId oid').optional(),
    status: Joi.string().optional().valid("pending","settled"),  
    search: Joi.string().optional(),  
    paidTo: Joi.string().optional().valid("broker","admin"),  
    claimId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an propertyId oid').optional(),
    brokerId:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
    dsaId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
    pageSize:Joi.string().optional().default(500),
    pageNo:Joi.string().optional().default(1),
});