const Joi = require('joi');

exports.addFurnishingDetail = Joi.object().keys({
    name:Joi.string().required(),
    furnishingQuantity:Joi.string().required(),
   
});

exports.updateFurnishingDetail = Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    name:Joi.string().required(),
    furnishingQuantity:Joi.string().required(),
   
});

exports.id = Joi.object().keys({
    id:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});


exports.filters = Joi.object().keys({
    pageSize:Joi.string().optional().default(500),
    pageNo:Joi.string().optional().default(1),
});
