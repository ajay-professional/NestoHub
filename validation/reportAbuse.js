const Joi = require('joi');

exports.addReportAbuse = Joi.object().keys({
    reason:  Joi.string().required(),
    comments:  Joi.string().required(),
    communitySupportAnswersId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    brokerId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.updateReportAbuse = Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    reason:  Joi.string().required(),
    comments:  Joi.string().required(),
    communitySupportAnswersId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    brokerId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.id = Joi.object().keys({
    id:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.filters = Joi.object().keys({
    pageSize:Joi.string().optional().default(500),
    pageNo:Joi.string().optional().default(1),
    brokerId:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
    communitySupportAnswersId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
});