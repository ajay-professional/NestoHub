
const mongoose = require('mongoose');

const { Schema } = mongoose;

const subscriptionOrderSchema = new Schema({
builderId: { type: Schema.ObjectId, ref: 'builder', default: null },
planId: { type: Schema.ObjectId, ref: 'subscription', default: null },
selectProperties: [{ type: Schema.ObjectId, ref: 'property', default: null }],
noOfVisits:{ type: Number, default: null },
transactionId:{ type: String, default: null },
expireOn:{ type: Date, default: null },
isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});

subscriptionOrderSchema.set('toObject');
subscriptionOrderSchema.set('toJSON');
module.exports = mongoose.model('subscriptionOrder', subscriptionOrderSchema);
