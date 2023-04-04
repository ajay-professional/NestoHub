const Joi = require('joi');

exports.addRaiseDispute = Joi.object().keys({
    reason:  Joi.string().required(),
    comments: Joi.string().required(),
    visitId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    builderId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required()
});

exports.updateRaiseDispute = Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    reason:  Joi.string().required(),
    comments: Joi.string().required(),
    visitId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    builderId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required()
});


exports.id = Joi.object().keys({
    id:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.filters = Joi.object().keys({
    pageSize:Joi.string().optional().default(500),
    pageNo:Joi.string().optional().default(1),
    builderId:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
    visitId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
});