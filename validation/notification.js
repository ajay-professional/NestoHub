const Joi = require('joi');

exports.filters = Joi.object().keys({
    sendTo:Joi.string().optional().valid('builder','broker'),
    builderId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an builderId oid').optional(),
    brokerId:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
    pageSize:Joi.string().optional().default(500),
    pageNo:Joi.string().optional().default(1),
});