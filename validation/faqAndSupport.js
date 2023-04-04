const Joi = require('joi');

exports.addFaqAndSupport = Joi.object().keys({
    question: Joi.string().required(), 
    answer: Joi.string().required(), 
    for: Joi.string().required().valid('dsa','broker', 'builder'),
    type: Joi.string().required().valid('support','faq')
});

exports.updateFaqAndSupport= Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    question: Joi.string().required(), 
    answer: Joi.string().required(), 
    for: Joi.string().required().valid('dsa','broker', 'builder'),
    type: Joi.string().required().valid('support','faq')
});

exports.id = Joi.object().keys({
    id:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.filters = Joi.object().keys({
    search: Joi.string().optional().trim().allow(""),
    for: Joi.string().optional().valid('dsa','broker', 'builder'),
    type: Joi.string().optional().valid('support','faq'),
    pageSize:Joi.string().optional().default(500),
    pageNo:Joi.string().optional().default(1)
});