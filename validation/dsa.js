const Joi = require('joi');

exports.sendOtp = Joi.object().keys({
    phoneNumber: Joi.string().min(10).max(10).required(),
});

exports.verifyOtp = Joi.object().keys({
    phoneNumber: Joi.string().min(10).max(10).required(),
    otp: Joi.string().min(6).max(6).required(),
});

exports.addDsa = Joi.object().keys({
    name: Joi.string().required(),
    phoneNumber: Joi.string().min(10).max(10).required(),
});

exports.updatePersonalInfo = Joi.object().keys({
    id:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    companyName: Joi.string().required(),
    email:Joi.string().email().required(),
    address: Joi.string().required(),
    areaOfOperations:Joi.string().required(),
    bankAssociations:Joi.string().required(),
    minLoanRange:Joi.string().required(),
    maxLoanRange:Joi.string().required(),
});