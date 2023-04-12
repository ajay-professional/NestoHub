const Joi = require('joi');

exports.addSubscription = Joi.object().keys({
          name:Joi.string().required(),
          isRecommended:Joi.string().required(),
          colour:Joi.string().required(),
          numberOfVisit:Joi.number().required(),
          planValidityInDays:Joi.number().required(),
          description:Joi.string().required(),
          numberOfproperty:Joi.number().required(),
          costPerMonth:Joi.number().required(), 
          minimumSpend:Joi.string().required(),  
});

exports.updateSubscription = Joi.object().keys({
          id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
          name:Joi.string().required(),
          isRecommended:Joi.string().required(),
          colour:Joi.string().required(),
          numberOfVisit:Joi.number().required(),
          planValidityInDays:Joi.number().required(),
          description:Joi.string().required(),
          numberOfproperty:Joi.number().required(),
          costPerMonth:Joi.number().required(), 
          minimumSpend:Joi.string().required(),  
});


exports.id = Joi.object().keys({
    id:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});


exports.filters = Joi.object().keys({
    pageSize:Joi.string().optional().default(500),
    pageNo:Joi.string().optional().default(1),
});