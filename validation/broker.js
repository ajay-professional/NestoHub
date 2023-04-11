const Joi = require('joi');

exports.sendOtp = Joi.object().keys({
    phoneNumber: Joi.string().min(10).max(10).required(),
});

exports.verifyOtp = Joi.object().keys({
    phoneNumber: Joi.string().min(10).max(10).required(),
    otp: Joi.string().min(6).max(6).required(),
});

exports.registerName = Joi.object().keys({
    name: Joi.string().required(),
    phoneNumber: Joi.string().min(10).max(10).required(),
    referalCode: Joi.string().optional().allow(''),
});

exports.addBroker = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().min(10).max(10).required(),
    address: Joi.string().required(),
    panNumber: Joi.string().required(),
    reraRegistrationNumber: Joi.string().required(),
});

exports.updateBroker = Joi.object().keys({
    id:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().min(10).max(10).required(),
    address: Joi.string().required(),
    panNumber: Joi.string().required(),
    reraRegistrationNumber: Joi.string().required(),
});

exports.registerFromReferal = Joi.object().keys({
    name: Joi.string().required(),
    phoneNumber: Joi.string().min(10).max(10).required(),
    referalCode:  Joi.string().min(8).max(8).required(),
    brokerId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.updatePersonalInfo = Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().min(10).max(10).required(),
    address: Joi.string().required(),
    panNumber: Joi.string().required(),
    reraRegistrationNumber: Joi.string().required(),
});


exports.updateBankInfo = Joi.object().keys({
    id:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    bankName:Joi.string().required(),
    accountNumber: Joi.string().required(),
    ifscCode:Joi.string().required(),
    recipientName: Joi.string().required(),
});


exports.updatePreferences = Joi.object().keys({
    id:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    locality: Joi.array().items(Joi.string().required()),
    propertyType:Joi.array().items(Joi.string().required()),
    experience: Joi.string().required(),
    top3Builders:Joi.array().items(Joi.string().required()),
});

exports.filters = Joi.object().keys({
    pageSize:Joi.string().optional().default(500),
    pageNo:Joi.string().optional().default(1),
});

exports.id = Joi.object().keys({
    id:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});








