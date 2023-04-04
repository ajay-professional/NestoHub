const Joi = require('joi');

exports.addCommunitySupportAnswers = Joi.object().keys({
    answer:  Joi.string().required(),
    communitySupportQuestionsId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    brokerId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.updateCommunitySupportAnswers = Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    answer:  Joi.string().required(),
    communitySupportQuestionsId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    brokerId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.id = Joi.object().keys({
    id:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.filters = Joi.object().keys({
    brokerId:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
    communitySupportQuestionsId:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
    pageSize:Joi.string().optional().default(500),
    pageNo:Joi.string().optional().default(1),
});