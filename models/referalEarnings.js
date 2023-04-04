const mongoose = require('mongoose');

const { Schema } = mongoose;

const referalEarningsSchema = new Schema({
    BrokerId: { type: Schema.ObjectId, ref: 'broker', default: null }, //B in capital to avoid confusion with brokerId
    BrokerPhoneNumber: { type: String, default: null }, //B in capital to avoid confusion with brokerId
    referDate:  { type: String, default: null },
    amount: { type: String, default: null },
    brokerId: { type: Schema.ObjectId, ref: 'broker', default: null },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});

referalEarningsSchema.set('toObject');
referalEarningsSchema.set('toJSON');
module.exports = mongoose.model('referalEarnings', referalEarningsSchema);