const mongoose = require('mongoose');

const { Schema } = mongoose;

const shareSchema = new Schema({
    name:  { type: String, default: null },
    phoneNumber: { type: String, default: null },
    email: { type: String, default: null },
    propertyId: { type: Schema.ObjectId, ref: 'property', default: null },
    brokerId: { type: Schema.ObjectId, ref: 'broker', default: null },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});


shareSchema.set('toObject');
shareSchema.set('toJSON');
module.exports = mongoose.model('share', shareSchema);