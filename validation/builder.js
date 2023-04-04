const Joi = require('joi');

exports.sendOtp = Joi.object().keys({
    phoneNumber: Joi.string().min(10).max(10).required(),
});

exports.verifyOtp = Joi.object().keys({
    phoneNumber: Joi.string().min(10).max(10).required(),
    otp: Joi.string().min(6).max(6).required(),
});

exports.addShareYourIntern = Joi.object().keys({
    name:  Joi.string().required(),
    email: Joi.string().required(),
    phoneNumber:  Joi.string().min(10).max(10).required(),
    typeOfProperty:Joi.string().required(),
    locationProperty:Joi.string().required(),
    projectName: Joi.string().optional(),
    description: Joi.string().optional(),
});

exports.updatePersonalInfo = Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    companyName: Joi.string().required(),
    email:  Joi.string().email().required(),
    phoneNumber:Joi.string().min(10).max(10).required(),
    address: Joi.string().required(),
    companyType: Joi.string().required().valid('private limited','proprietorship','individual','partnership','llc'),
    gst: Joi.string().required(),
    panOfCompany: Joi.string().required(),
});


exports.addBuilder = Joi.object().keys({
    phoneNumber: Joi.string().min(10).max(10).required(),
    name:Joi.string().required(),
    referalCode:Joi.string().optional().allow(''),
    email: Joi.string().email().required(),
    typeOfProperty: Joi.string().required(),
    locationOfProperty: Joi.string().required(),
    projectName:Joi.string().required(),
    description:Joi.string().required(),
    companyName:Joi.string().required(),
    address:Joi.string().required(),
    companyType:Joi.string().required(),
    gst: Joi.string().required(),
    panOfCompany:Joi.string().required(),
    rating:Joi.string().optional(),
    termAndCondition:Joi.string().optional(),
});


exports.updateBuilder = Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    phoneNumber: Joi.string().min(10).max(10).required(),
    name:Joi.string().required(),
    referalCode:Joi.string().optional().allow(''),
    email: Joi.string().email().required(),
    typeOfProperty: Joi.string().required(),
    locationOfProperty: Joi.string().required(),
    projectName:Joi.string().required(),
    description:Joi.string().required(),
    companyName:Joi.string().required(),
    address:Joi.string().required(),
    companyType: Joi.array().optional().items(Joi.string().optional()).required(),
    gst: Joi.string().required(),
    panOfCompany:Joi.string().required(),
    rating:Joi.string().optional(),
    termAndCondition:Joi.string().optional(),
});


exports.addSubBuilder = Joi.object().keys({
    subBuilderType:  Joi.string().required().valid('property','finance'),
    parentId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    name: Joi.string().required(),  
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().min(10).max(10).required(),
    selectProperties:Joi.array().optional().items(Joi.string().optional()).required(),
});

exports.updateSubBuilder = Joi.object().keys({
    id:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    subBuilderType:  Joi.string().required().valid('property','finance'),
    parentId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    name: Joi.string().required(),  
    email: Joi.string().email().required(),
   // phoneNumber: Joi.string().min(10).max(10).required(),
    selectProperties:Joi.array().optional().items(Joi.string().optional()).required(),
});

exports.id = Joi.object().keys({
    id:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.filters = Joi.object().keys({
    pageSize:Joi.string().optional().default(500),
    pageNo:Joi.string().optional().default(1),
    subBuilderType:  Joi.string().optional().valid('property','finance'),
    parentId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
});
