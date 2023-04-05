const Joi = require('joi');

exports.addVisit = Joi.object().keys({
    propertyName: Joi.string().required(),
    date: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    email: Joi.string().email().required(),
    chooseSlot: Joi.string().required(),
    minPrice: Joi.string().required(),
    maxPrice: Joi.string().required(),
    unitType: Joi.array().optional().items(Joi.string().optional()).required(),
    preferredLocation: Joi.array().optional().items(Joi.string().optional()).required(),
    clientName: Joi.string().required(),
    customerId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
    requirementId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
    propertyId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    brokerId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    builderId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.visitSummary = Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    clientName: Joi.string().optional(),
    commentHistory:Joi.array().items(Joi.object().keys({
        date:Joi.string().required(), 
        comment:Joi.string().required(), 
    })),
    followUpDate:  Joi.string().required(),
    followUpTime: Joi.string().required(),
    visitStatus:Joi.string().valid('pending', 'completed', 'followup', 'negotiation', 'bought').required(),
    overAllRating: Joi.string().optional(),
    builderBehavior: Joi.string().optional(),
    builderPunctuality:Joi.string().optional(),
    builderCleanliness:Joi.string().optional(),
    rateTheSatisfaction:Joi.string().optional(),
    writeReview:Joi.string().optional(),
});

exports.visitComment = Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    date:Joi.string().required(), 
    comment:Joi.string().optional()
});

exports.sendOtp = Joi.object().keys({
    visitId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    builderId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
});

exports.verifyOtp = Joi.object().keys({
    visitId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    otp: Joi.string().min(6).max(6).required(),
});

exports.id = Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.filters = Joi.object().keys({
    pageSize:Joi.string().optional().default(500),
    pageNo:Joi.string().optional().default(1),
    requirementId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
    brokerId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
    builderId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
    customerId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
    propertyId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
    isPromoted: Joi.string().optional(),
    visitStatus:Joi.string().valid('pending', 'completed', 'followup', 'negotiation', 'bought').optional(),
});

exports.getAllVisitAlert = Joi.object().keys({
    brokerId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.getPendingVisitAnalytics = Joi.object().keys({
    builderId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
    propertyId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').optional(),
});