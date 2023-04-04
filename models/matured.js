const mongoose = require('mongoose');

const { Schema } = mongoose;

const maturedSchema = new Schema({
    dsaName:  { type: String, default: null },
    bankName:  { type: String, default: null },
    disbursedAmount:{ type: String, default: null },
    disbursedDate:{ type: String, default: null },
    customerId:{ type: Schema.ObjectId, ref: 'customer', default: null },
    propertyId:{ type: Schema.ObjectId, ref: 'property', default: null },
    brokerId: { type: Schema.ObjectId, ref: 'broker', default: null },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});


maturedSchema.set('toObject');
maturedSchema.set('toJSON');
module.exports = mongoose.model('matured', maturedSchema);