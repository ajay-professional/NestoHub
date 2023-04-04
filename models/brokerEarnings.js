const mongoose = require('mongoose');

const { Schema } = mongoose;

const brokerEarningsSchema = new Schema({
    claimId:{ type: String, default: null },
    transactionId:{ type: String, default: null },
    paymentDate:{ type: String, default: null },
    amount:{ type: String, default: null },
    brokerId: { type: Schema.ObjectId, ref: 'broker', default: null },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});


brokerEarningsSchema.set('toObject');
brokerEarningsSchema.set('toJSON');
module.exports = mongoose.model('brokerEarnings', brokerEarningsSchema);