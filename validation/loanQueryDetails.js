const Joi = require('joi');

exports.addLoanQueryDetails = Joi.object().keys({
    propertyType: Joi.string().required(),
    propertyId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an clientId oid').required(),
    boughtPropertyId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an clientId oid').required(),
    builderId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an clientId oid').required(),
    clientId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an clientId oid').required(),
    brokerId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an brokerId oid').required(),
    demandingCost: Joi.string().required(),
    loanRequirement: Joi.string().required(),
    requiredDate: Joi.string().required(),
    preferedBank: Joi.array().items(Joi.string().required()),
    loanApplicationDetails: Joi.array().items(Joi.object().keys({
        bankName: Joi.string().required(),
        date: Joi.string().required(),
        status: Joi.string().required(),
        loanApplicationNo: Joi.string().required(),
    })),
    followUpComment: Joi.array().items(Joi.object().keys({
        comment: [Joi.string().required(),],
        date: Joi.string().required(),

    })),
    followupDate: Joi.string().required(),
    followupTime: Joi.string().required(),
    queryStatus: Joi.string().required(),
});

exports.updateLoanQueryDetails = Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    demandingCost: Joi.string().optional(),
    loanRequirement: Joi.string().optional(),
    requiredDate: Joi.string().optional(),
    preferedBank: Joi.array().items(Joi.string().optional()).optional(),
    loanApplicationDetails: Joi.array().items(Joi.object().keys({
        bankName: Joi.string().required(),
        date: Joi.string().required(),
        status: Joi.string().required(),
        loanApplicationNo: Joi.string().required(),
    })),
    followUpComment: Joi.array().items(Joi.object().keys({
        comment: [Joi.string().optional(),],
        date: Joi.string().optional(),

    })).optional(),
    followupDate: Joi.string().required(),
    followupTime: Joi.string().required(),
    queryStatus: Joi.string().required().valid('matured', 'notmatured', 'assigned'),

});


exports.id = Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.filters = Joi.object().keys({
    dsaId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
    clientId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
    brokerId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
    queryStatus: Joi.string().optional().valid('matured', 'notmatured', 'assigned'),
    search: Joi.string().optional().trim().allow(""),
});

exports.updateDisbursementDetails = Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    bankName: Joi.string().required(),
    loanApplicationNo: Joi.string().required(),
    disbursementDate: Joi.string().required(),
    disbursementAmount: Joi.string().required(),
});

exports.updateLoanQueryStatus = Joi.object().keys({
    loanQueryId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    brokerId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    dsaId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    boughtPropertyId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    propertyType: Joi.string().required(),
    status: Joi.string().required().valid('accepted', 'declined'),
    demandingCost: Joi.string().required(),
    denyReason: Joi.string().optional(),
});

exports.updateDsaInLoanQueryByAdmin = Joi.object().keys({
    loanQueryId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    dsaId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});
    