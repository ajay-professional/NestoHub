const mongoose = require('mongoose');

const { Schema } = mongoose;

const loanQueryDetailsSchema = new Schema({
    propertyType: { type: String, default: null },
    propertyId: { type: Schema.ObjectId, ref: 'property', default: null },
    boughtPropertyId: { type: Schema.ObjectId, ref: 'bought', default: null },
    clientId: { type: Schema.ObjectId, ref: 'customer', default: null },
    brokerId: { type: Schema.ObjectId, ref: 'broker', default: null },
    builderId: { type: Schema.ObjectId, ref: 'builder', default: null },
    demandingCost: { type: String, default: null },
    loanRequirement: { type: String, default: null },
    requiredDate: { type: String, default: null },
    preferedBank: [{ type: String, default: null }],
    loanApplicationDetails: [{
        bankName: { type: String, default: null },
        date: { type: String, default: null },
        status: { type: String, default: null },
        loanApplicationNo: { type: String, default: null },
    }],

    followUpComment: [{
        comment: [{ type: String, default: null }],
        date: { type: String, default: null },

    }],
    disbursementDetails:{
        bankName: { type: String, default: null },
        loanApplicationNo: { type: String, default: null },
        disbursementDate: { type: String, default: null },
        disbursementAmount: { type: String, default: null },
    },
    followupDate: { type: String, default: null },
    followupTime: { type: String, default: null },
    queryStatus: { type: String, default: 'pending' },
    dsaId:  { type: Schema.ObjectId, ref: 'dsa', default: null },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});


loanQueryDetailsSchema.set('toObject');
loanQueryDetailsSchema.set('toJSON');
module.exports = mongoose.model('loanQueryDetails', loanQueryDetailsSchema);
