const mongoose = require('mongoose');

const { Schema } = mongoose;

const paymentSchema = new Schema({
    bankName: { type: String, default: null },
    accountNumber:{ type: String, default: null },
    ifscCode:{ type: String, default: null },
    recipientName: { type: String, default: null },
    transactionDate:{ type: String, default: null },
    transactionId: { type: String, default: null },
    transactionAmount:{ type: String, default: null },
    builderId: { type: Schema.ObjectId, ref: 'builder', default: null },
    brokerId: { type: Schema.ObjectId, ref: 'broker', default: null },
    invoiceId: { type: Schema.ObjectId, ref: 'invoice', default: null },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});
////////////edfwefe

paymentSchema.set('toObject');
paymentSchema.set('toJSON');
module.exports = mongoose.model('payment', paymentSchema);