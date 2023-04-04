const mongoose = require('mongoose');

const { Schema } = mongoose;

const customerSchema = new Schema({
    clientName:  { type: String, default: null },
    email: { type: String, default: null },
    phoneNumber: { type: String, default: null },
    alternatePhoneNumber: { type: String, default: null },
    unitType: [{ type: String, default: null }],
    preferredLocation:[{ type: String, default: null }],
    minPrice: { type: String, default: null },
    maxPrice: { type: String, default: null },
    brokerId: { type: Schema.ObjectId, ref: 'broker', default: null },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});


customerSchema.set('toObject');
customerSchema.set('toJSON');
module.exports = mongoose.model('customer', customerSchema);