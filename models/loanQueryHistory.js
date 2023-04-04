const mongoose = require('mongoose');

const { Schema } = mongoose;

const loanQueryHistorySchema = new Schema({
    loanQueryId:{ type: Schema.ObjectId, ref: 'loanQueryDetails', default: null },
    brokerId: { type: Schema.ObjectId, ref: 'broker', default: null },
    dsaId: { type: Schema.ObjectId, ref: 'dsa', default: null },
    boughtPropertyId: { type: Schema.ObjectId, ref: 'property', default: null },
    propertyType: { type: String, default: null },
    status:  { type: String, default: null },
    demandingCost: { type: String, default: null },
    denyReason:  { type: String, default: null },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});

loanQueryHistorySchema.set('toObject');
loanQueryHistorySchema.set('toJSON');
module.exports = mongoose.model('loanQueryHistory', loanQueryHistorySchema);