const mongoose = require('mongoose');

const { Schema } = mongoose;

const furnishingDetailSchema = new Schema({
    name: { type: String, default: null },
    furnishingQuantity:{ type: String, default: null },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});


furnishingDetailSchema.set('toObject');
furnishingDetailSchema.set('toJSON');
module.exports = mongoose.model('furnishingDetail', furnishingDetailSchema);