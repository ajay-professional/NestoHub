const Joi = require('joi');

exports.addTutorials = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    link:Joi.string().uri()
});
//Joi.string().uri()
exports.updateTutorials= Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    link:Joi.string().uri()
});

exports.id = Joi.object().keys({
    id:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.filters = Joi.object().keys({
    search: Joi.string().optional().trim().allow(""),
    pageSize:Joi.string().optional().default(500),
    pageNo:Joi.string().optional().default(1)
});