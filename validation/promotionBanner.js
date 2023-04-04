const Joi = require('joi');

exports.addPromotionBanner = Joi.object().keys({
    propertyId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.updatePromotionBanner = Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    propertyId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});


exports.id = Joi.object().keys({
    id:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.filters = Joi.object().keys({
    brokerId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
    pageSize:Joi.string().optional().default(500),
    pageNo:Joi.string().optional().default(1),
});