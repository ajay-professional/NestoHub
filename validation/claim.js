const Joi = require('joi');

exports.addClaim = Joi.object().keys({
    claimType:Joi.string().required().valid('dsa','property','visit'),
    milestoneNumber:Joi.string().required(),
    brokeragePercentage:Joi.string().optional(),
    brokerageAmount:Joi.string().required(),
    visitId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    propertyId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    boughtPropertyId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
    builderId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    brokerId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.updateClaim= Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    claimType:Joi.string().required(),
    milestoneNumber:Joi.string().required(),
    brokeragePercentage:Joi.string().required(),
    brokerageAmount:Joi.string().required(),
    paymentId:Joi.string().required(),
    paymentDate:Joi.string().required(),
    claimStatus:Joi.string().required(),
    claimRejectReason:Joi.string().required(),
    date:Joi.string().required(),
    visitId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    propertyId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    boughtPropertyId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    builderId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    brokerId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});


exports.id = Joi.object().keys({
    id:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.updateClaimStatusForBroker = Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    claimStatus: Joi.string().required().valid('submitted')
});

exports.updateClaimStatusForAdmin= Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    claimStatus: Joi.string().required().valid('submitted','approved','recieved','paid','rejected')
});


exports.filters = Joi.object().keys({
    propertyId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
    boughtPropertyId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
    builderId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
    brokerId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
    pageSize:Joi.string().optional().default(500),
    pageNo:Joi.string().optional().default(1),
    claimStatus:Joi.string().optional().valid('pending','settled'),
    claimType:Joi.string().required().valid('property','dsa','visit','all'),
    search: Joi.string().optional().trim().allow(""),
});

exports.getPropertiesEligibleForClaim = Joi.object().keys({
    brokerId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    pageSize:Joi.string().optional().default(500),
    pageNo:Joi.string().optional().default(1),
    search: Joi.string().optional().trim().allow("")
});