const mongoose = require('mongoose');

const { Schema } = mongoose;

const faqAndSupportSchema = new Schema({
    question:  { type: String, default: null },
    answer:  { type: String, default: null },
    for:  { type: String, default: null },
    type:  { type: String, default: null },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});


faqAndSupportSchema.set('toObject');
faqAndSupportSchema.set('toJSON');
module.exports = mongoose.model('faqAndSupport', faqAndSupportSchema);