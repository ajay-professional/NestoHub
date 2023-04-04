const Joi = require('joi');
exports.addTermsAndConditionsBroker = Joi.object().keys({
    description:Joi.string().required(),
});

exports.updateTermsAndConditionsBroker = Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    description:Joi.string().required(),
});


exports.id = Joi.object().keys({
    id:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.filters = Joi.object().keys({
    pageSize:Joi.string().optional().default(500),
    pageNo:Joi.string().optional().default(1),
});
