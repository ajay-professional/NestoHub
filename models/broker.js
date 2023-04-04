const mongoose = require('mongoose');

const { Schema } = mongoose;

const brokerSchema = new Schema({
    phoneNumber: { type: String, default: null },
    otp:  { type: String, default: null },
    name: { type: String, default: null },
    referalCode:  { type: String, default: null },
    email: { type: String, default: null },
    panNumber:  { type: String, default: null },
    reraRegistrationNumber: { type: String, default: null },
    address: { type: String, default: null },
    bankName: { type: String, default: null },
    accountNumber: { type: String, default: null},
    ifscCode: { type: String, default: null },
    recipientName: { type: String, default: null },
    profilePicture:{ type: String, default: null },
    documents:  [{ type: String, default: null }],
    locality: [{ type: String, default: null }],
    propertyType:[{ type: String, default: null }],
    experience: { type: String, default: null },
    top3Builders: [{ type: String, default: null }],
    referCount: { type: String, default: "0" },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});

brokerSchema.set('toObject');
brokerSchema.set('toJSON');
module.exports = mongoose.model('broker', brokerSchema);
