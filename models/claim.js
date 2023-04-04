const mongoose = require('mongoose');

const { Schema } = mongoose;

const claimSchema = new Schema({
    claimType:{ type: String, default: null },
    milestoneNumber:{ type: String, default: null },
    brokeragePercentage:{ type: String, default: null },
    brokerageAmount:{ type: String, default: null },
    paymentId:{ type: String, default: null },
    paymentDate:{ type: String, default: null },
    paymentPdf:{ type: String, default: null },
    claimPdf:{ type: String, default: null },
    claimStatus:{ type: String, default:"pending" },
    date:{ type: String, default: null },
    claimRejectReason:{ type: String, default: null },
    propertyId:{ type: Schema.ObjectId, ref: 'property', default: null },
    boughtPropertyId:{ type: Schema.ObjectId, ref: 'bought', default: null },
    builderId: { type: Schema.ObjectId, ref: 'builder', default: null },
    brokerId: { type: Schema.ObjectId, ref: 'broker', default: null },
    dsaId: { type: Schema.ObjectId, ref: 'dsa', default: null },
    invoiceIds: [{ type: Schema.ObjectId, ref: 'invoice', default: null }],
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});


claimSchema.set('toObject');
claimSchema.set('toJSON');
module.exports = mongoose.model('claim', claimSchema);