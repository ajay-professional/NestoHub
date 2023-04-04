const Joi = require('joi');
exports.addShare = Joi.object().keys({
    name:Joi.string().required(),
    phoneNumber:Joi.string().min(10).max(10).required(),
    email: Joi.string().email().required(),
    propertyId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    brokerId:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.updateShare = Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    name:Joi.string().required(),
    phoneNumber:Joi.string().min(10).max(10).required(),
    email: Joi.string().email().required(),
    propertyId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    brokerId:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});


exports.id = Joi.object().keys({
    id:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.filters = Joi.object().keys({
    pageSize:Joi.string().optional().default(500),
    pageNo:Joi.string().optional().default(1),
    propertyId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
    brokerId:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
});
