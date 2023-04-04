const Joi = require('joi');

exports.login = Joi.object().keys({
    username:Joi.string().required(),
    password:Joi.string().required()
})