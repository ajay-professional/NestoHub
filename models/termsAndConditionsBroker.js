const mongoose = require('mongoose');

const { Schema } = mongoose;

const termsAndConditionsBrokerSchema = new Schema({
    description:  { type: String, default: null },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});


termsAndConditionsBrokerSchema.set('toObject');
termsAndConditionsBrokerSchema.set('toJSON');
module.exports = mongoose.model('termsAndConditionsBroker', termsAndConditionsBrokerSchema);