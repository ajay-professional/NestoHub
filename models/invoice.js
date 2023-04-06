const mongoose = require('mongoose');

const { Schema } = mongoose;

const invoiceSchema = new Schema({
    invoiceAmount:{ type: String, default: null },
    status:{ type: String, default: "pending" },
    paidTo:{ type: String, default: null },
    paymentDate:{ type: String, default: null },
    brokerId: { type: Schema.ObjectId, ref: 'broker', default: null },
    builderId: { type: Schema.ObjectId, ref: 'builder', default: null },
    claimId:{ type: Schema.ObjectId, ref: 'claim', default: null },
    transactionId:{ type: String, default: null },
    dsaId:{ type: Schema.ObjectId, ref: 'dsa', default: null },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});
invoiceSchema.set('toObject');
invoiceSchema.set('toJSON');
module.exports = mongoose.model('invoice', invoiceSchema);
