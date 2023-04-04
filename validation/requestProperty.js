const Joi = require('joi');

exports.addRequestProperty = Joi.object().keys({
    name: Joi.string().required(),
    location: Joi.string().required(),
    categoryId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an categoryId oid').required(),// change category to id
    locationAdvantages: Joi.string().optional(),
    amenities: Joi.string().optional(),
    paymentPlan:Joi.string().optional(),
    loanApprovedBy:Joi.string().optional(),
    propertyId:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an propertyId oid').required(),
    builderId:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an builderId oid').required(),
});

exports.updateRequestProperty = Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    name: Joi.string().optional(),
    location: Joi.string().optional(),
    categoryId: Joi.string().optional(),
    locationAdvantages: Joi.string().optional(),
    amenities: Joi.string().optional(),
    paymentPlan:Joi.string().optional(),
    loanApprovedBy:Joi.string().optional(),
    propertyId:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    builderId:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required()
});



exports.id = Joi.object().keys({
    id:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.filters = Joi.object().keys({
    pageSize:Joi.string().optional().default(500),
    pageNo:Joi.string().optional().default(1),
    builderId:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
});