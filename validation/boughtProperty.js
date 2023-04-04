const Joi = require('joi');

exports.addBoughtProperty= Joi.object().keys({
    bookingDate: Joi.string().required(),
    unitNumber: Joi.string().required(),
    unitType: Joi.string().required(),
    builderRepresentativeName: Joi.string().required(),
    sellingPrice: Joi.string().required(),
    brokerageValue: Joi.string().required(),
    customerId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an customer oid').required(),
    propertyId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an property oid').required(),
    builderId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an builder oid').required(),
    brokerId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an broker oid').required(),
    visitId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an visit oid').required(),
});

exports.updateBoughtProperty= Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    bookingDate: Joi.string().required(),
    unitNumber: Joi.string().required(),
    unitType: Joi.string().required(),
    builderRepresentativeName: Joi.string().required(),
    sellingPrice: Joi.string().required(),
    brokerageValue: Joi.string().required(),
    customerId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an customer oid').required(),
    propertyId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an property oid').required(),
    builderId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an property oid').required(),
    brokerId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an broker oid').required(),
    visitId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an visit oid').required(),
});


exports.id = Joi.object().keys({
    id:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.filters = Joi.object().keys({
    brokerId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
    builderId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
    propertyId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
    customerId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
    visitId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
    pageSize:Joi.string().optional().default(500),
    pageNo:Joi.string().optional().default(1),
});
