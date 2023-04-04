const mongoose = require('mongoose');

const { Schema } = mongoose;

const dsaSchema = new Schema({
    phoneNumber: { type: String, default: null },
    otp:{ type: String, default: null },
    companyName: { type: String, default: null },
    email:{ type: String, default: null },
    address: { type: String, default: null },
    areaOfOperations:[{ type: String, default: null }],
    bankAssociations:[{ type: String, default: null }],
    minLoanRange:{ type: String, default: null },
    maxLoanRange:{ type: String, default: null },
    documents: [{ type: String, default: null }],
    profilePicture:{ type: String, default: null },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});


dsaSchema.set('toObject');
dsaSchema.set('toJSON');
module.exports = mongoose.model('dsa', dsaSchema);