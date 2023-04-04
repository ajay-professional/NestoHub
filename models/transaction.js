const mongoose = require('mongoose');

const { Schema } = mongoose;

const transactionSchema = new Schema({
    paymentId:  { type: String, default: null },
    paymentDate: { type: String, default: null },
    amount:  { type: String, default: null },
    invoiceId:  { type: Schema.ObjectId, ref: 'invoice', default: null },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});
transactionSchema.set('toObject');
transactionSchema.set('toJSON');
module.exports = mongoose.model('broker', transactionSchema);
