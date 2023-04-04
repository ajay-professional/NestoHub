const mongoose = require('mongoose');

const { Schema } = mongoose;

const bannerSchema = new Schema({
    image:  { type: String, default: null },
    title:  { type: String, default: null },
    description:  { type: String, default: null },
    propertyId: { type: String, default: null },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});

bannerSchema.set('toObject');
bannerSchema.set('toJSON');
module.exports = mongoose.model('banner', bannerSchema);